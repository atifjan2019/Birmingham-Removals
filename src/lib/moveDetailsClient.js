// The move details form's own calls to the API, made straight from the
// browser: answers are saved as they are given, and photos and files go up
// directly because they are too large to pass through a server action. The
// customer's link token in the path is what authorises each call. Every call
// has a time limit, so a request the network has swallowed turns into a
// failure the form can show and retry rather than a wait that never ends.

const SAVE_TIMEOUT_MS = 15000;
// An upload is given up on when nothing has moved for this long, however far
// it has got. A total time limit would cut off a large file on a slow
// connection that was still getting there.
const UPLOAD_STALL_MS = 45000;

async function readJson(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function failure(response, payload, fallback) {
  const error = new Error(payload?.error?.message || fallback);
  error.status = response.status;
  return error;
}

/**
 * fetch with a time limit. The save made as the page is hidden has one too: a
 * page that closes takes its timer with it, so the limit never cuts off the
 * request it leaves behind, but a page that is still open must not wait for
 * good on a request the network has swallowed, because every save after it
 * waits in turn.
 */
async function timedFetch(url, options, ms) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

export function createMoveDetailsApi(apiBase, token) {
  const base = `${String(apiBase || "").replace(/\/+$/, "")}/move-details/${encodeURIComponent(token)}`;

  return {
    /** The answers and files as the API holds them now. */
    async load() {
      const response = await timedFetch(base, { cache: "no-store" }, SAVE_TIMEOUT_MS);
      const payload = await readJson(response);
      if (!response.ok) throw failure(response, payload, "Could not load your answers.");
      return payload.data;
    },

    /**
     * Saves the answers. `baseVersion` is the version they were changed from,
     * `saveId` names this save and `sentIds` the ones this page made before
     * it. Resolves to { version, updatedAt }, or to { conflict: true, current }
     * when the answers have been changed somewhere else since `baseVersion`:
     * `current` is then what the API holds. `keepalive` lets the request
     * finish after the page has gone, for the save that fires as the tab closes.
     */
    async save({ details, baseVersion, saveId, sentIds }, { keepalive = false } = {}) {
      const response = await timedFetch(
        base,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ details, baseVersion, saveId, sentIds }),
          keepalive,
        },
        SAVE_TIMEOUT_MS
      );
      const payload = await readJson(response);
      if (response.status === 409 && payload?.data) return { conflict: true, current: payload.data };
      if (!response.ok) throw failure(response, payload, "Could not save your answers.");
      return payload.data;
    },

    /**
     * Uploads one photo or file. `clientId` is the form's own id for it: a
     * second attempt under the same id is answered with the file already
     * stored, so a retry after a lost reply never makes a duplicate. Returns
     * { promise, abort }. It is sent with XMLHttpRequest, not fetch, because
     * only that reports progress on the way up, which is what tells a slow
     * upload from a stalled one.
     */
    upload({ file, name, thumb, clientId }) {
      const body = new FormData();
      body.append("file", file, name);
      body.append("clientId", clientId);
      if (thumb) body.append("thumb", thumb);

      const request = new XMLHttpRequest();
      const promise = new Promise((resolve, reject) => {
        let stall;
        const moved = () => {
          clearTimeout(stall);
          stall = setTimeout(() => request.abort(), UPLOAD_STALL_MS);
        };
        const fail = (message, status) => {
          clearTimeout(stall);
          const error = new Error(message);
          error.status = status;
          reject(error);
        };

        // The id is in the address as well as the body, so the API can recognise
        // a repeat before it reads the file or checks the limits.
        request.open("POST", `${base}/files?clientId=${encodeURIComponent(clientId)}`);
        request.upload.onprogress = moved;
        request.onload = () => {
          clearTimeout(stall);
          let payload = null;
          try {
            payload = JSON.parse(request.responseText);
          } catch {
            // Not the API's answer: a proxy's error page, say.
          }
          if (request.status >= 200 && request.status < 300 && payload?.data) resolve(payload.data);
          else fail(payload?.error?.message || "Could not upload that file.", request.status || undefined);
        };
        request.onerror = () => fail("Could not upload that file.");
        request.onabort = () => fail("The upload was stopped.");
        moved();
        request.send(body);
      });

      return { promise, abort: () => request.abort() };
    },

    /** Removes a file, named by its own id or by the id the form gave it. */
    async remove(fileId) {
      const response = await timedFetch(
        `${base}/files/${encodeURIComponent(fileId)}`,
        { method: "DELETE" },
        SAVE_TIMEOUT_MS
      );
      // Already gone is as good as deleted.
      if (!response.ok && response.status !== 404) {
        throw failure(response, await readJson(response), "Could not remove that file.");
      }
    },
  };
}
