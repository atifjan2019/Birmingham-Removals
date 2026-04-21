import ActivityLogClient from "./ActivityLogClient";
import { listActivity } from "@/lib/workerApi";

export default async function ActivityLogPage() {
  const logs = await listActivity();
  const actionTypes = [...new Set(logs.map((log) => log.action))].sort();

  return <ActivityLogClient initialLogs={logs} actionTypes={actionTypes} />;
}
