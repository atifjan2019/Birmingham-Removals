import { CONSENT_COOKIE } from "@/lib/consent";

/**
 * Google's consent defaults, declared first in <head> before anything can
 * measure. Everything starts denied; a stored "yes" is applied straight
 * after. The advertising signals stay denied for good: no ads are run from
 * this site. A raw script rather than next/script, so it runs while the page
 * is parsed. gtag must push `arguments` itself, not a copy, or Google ignores it.
 */
const script = `
(function(){
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted'
  });
  try {
    var m = document.cookie.match(/(?:^|; )${CONSENT_COOKIE}=([^;]*)/);
    if (m && decodeURIComponent(m[1]) === 'granted') {
      gtag('consent', 'update', { analytics_storage: 'granted' });
    }
  } catch (e) {}
})();
`;

export default function ConsentDefault() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
