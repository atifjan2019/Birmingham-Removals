import prisma from "@/lib/prisma";
import ActivityLogClient from "./ActivityLogClient";

export default async function ActivityLogPage() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Cleanup old entries
  await prisma.activityLog.deleteMany({
    where: { createdAt: { lt: thirtyDaysAgo } },
  });

  const [logs, actionTypes] = await Promise.all([
    prisma.activityLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
    }),
    prisma.activityLog
      .findMany({
        select: { action: true },
        distinct: ["action"],
        orderBy: { action: "asc" },
      })
      .then((r) => r.map((x) => x.action)),
  ]);

  return <ActivityLogClient initialLogs={JSON.parse(JSON.stringify(logs))} actionTypes={actionTypes} />;
}
