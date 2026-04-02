"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * Log an activity event. Automatically cleans up entries older than 30 days.
 */
export async function logActivity({ action, details, entityId, actor = "system" }) {
  try {
    await prisma.activityLog.create({
      data: {
        action,
        details: typeof details === "object" ? JSON.stringify(details) : details,
        entityId: entityId || null,
        actor: actor || "system",
      },
    });

    // Cleanup: delete entries older than 30 days (run async, don't block)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    await prisma.activityLog.deleteMany({
      where: { createdAt: { lt: thirtyDaysAgo } },
    });
  } catch (error) {
    console.error("Failed to log activity:", error);
    // Don't throw — logging should never break the main flow
  }
}

/**
 * Get activity logs with optional filtering
 */
export async function getActivityLogs({ page = 1, perPage = 50, action = null } = {}) {
  try {
    const where = {};
    if (action) {
      where.action = action;
    }

    const [logs, total] = await Promise.all([
      prisma.activityLog.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      prisma.activityLog.count({ where }),
    ]);

    return {
      logs,
      total,
      totalPages: Math.ceil(total / perPage),
      currentPage: page,
    };
  } catch (error) {
    console.error("Failed to fetch activity logs:", error);
    return { logs: [], total: 0, totalPages: 0, currentPage: 1 };
  }
}

/**
 * Get distinct action types for filter dropdown
 */
export async function getActionTypes() {
  try {
    const results = await prisma.activityLog.findMany({
      select: { action: true },
      distinct: ["action"],
      orderBy: { action: "asc" },
    });
    return results.map((r) => r.action);
  } catch (error) {
    console.error("Failed to fetch action types:", error);
    return [];
  }
}
