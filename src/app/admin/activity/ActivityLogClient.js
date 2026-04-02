"use client";

import { useState } from "react";
import {
  Search,
  Activity,
  CalendarDays,
  UserPlus,
  Trash2,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Clock,
  Filter,
} from "lucide-react";

const ACTION_CONFIG = {
  "booking.created": {
    icon: UserPlus,
    color: "text-emerald-600",
    bg: "bg-emerald-50 border-emerald-200",
    label: "Booking Created",
  },
  "booking.status_updated": {
    icon: RefreshCw,
    color: "text-blue-600",
    bg: "bg-blue-50 border-blue-200",
    label: "Status Updated",
  },
  "booking.deleted": {
    icon: Trash2,
    color: "text-red-600",
    bg: "bg-red-50 border-red-200",
    label: "Booking Deleted",
  },
  "booking.financials_updated": {
    icon: CheckCircle2,
    color: "text-violet-600",
    bg: "bg-violet-50 border-violet-200",
    label: "Financials Updated",
  },
  "lead.abandoned_captured": {
    icon: AlertCircle,
    color: "text-amber-600",
    bg: "bg-amber-50 border-amber-200",
    label: "Abandoned Lead",
  },
};

const DEFAULT_CONFIG = {
  icon: Activity,
  color: "text-gray-600",
  bg: "bg-gray-50 border-gray-200",
  label: "Activity",
};

function formatRelativeTime(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now - date;
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatFullDate(dateStr) {
  return new Date(dateStr).toLocaleString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ActivityLogClient({ initialLogs, actionTypes }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAction, setFilterAction] = useState("all");

  const filteredLogs = initialLogs.filter((log) => {
    const matchesSearch =
      searchTerm === "" ||
      (log.details || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.entityId || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.actor || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterAction === "all" || log.action === filterAction;

    return matchesSearch && matchesFilter;
  });

  // Group logs by date
  const groupedLogs = {};
  filteredLogs.forEach((log) => {
    const dateKey = new Date(log.createdAt).toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    if (!groupedLogs[dateKey]) groupedLogs[dateKey] = [];
    groupedLogs[dateKey].push(log);
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-[family-name:var(--font-space)]">
            Activity Log
          </h1>
          <p className="text-muted mt-1">
            Track all system events from the last 30 days.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted">
          <Clock className="w-4 h-4" />
          {initialLogs.length} events recorded
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-visible">
        <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative max-w-md w-full">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search activity..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="all">All Events</option>
              {actionTypes.map((type) => (
                <option key={type} value={type}>
                  {ACTION_CONFIG[type]?.label || type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Timeline */}
        <div className="p-4 sm:p-6">
          {Object.keys(groupedLogs).length > 0 ? (
            <div className="space-y-8">
              {Object.entries(groupedLogs).map(([dateLabel, logs]) => (
                <div key={dateLabel}>
                  {/* Date header */}
                  <div className="flex items-center gap-3 mb-4">
                    <CalendarDays className="w-4 h-4 text-muted" />
                    <h3 className="text-sm font-semibold text-gray-900">
                      {dateLabel}
                    </h3>
                    <div className="flex-1 h-px bg-gray-100" />
                    <span className="text-xs text-muted">
                      {logs.length} event{logs.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Log entries */}
                  <div className="space-y-1 ml-2 border-l-2 border-gray-100 pl-6">
                    {logs.map((log) => {
                      const config =
                        ACTION_CONFIG[log.action] || DEFAULT_CONFIG;
                      const Icon = config.icon;

                      return (
                        <div
                          key={log.id}
                          className="relative group flex items-start gap-3 py-3 px-3 rounded-xl hover:bg-gray-50/80 transition-colors -ml-3"
                        >
                          {/* Timeline dot */}
                          <div className="absolute -left-[1.9rem] top-4 w-3 h-3 rounded-full bg-white border-2 border-gray-200 group-hover:border-primary transition-colors" />

                          {/* Icon */}
                          <div
                            className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 ${config.bg}`}
                          >
                            <Icon className={`w-4 h-4 ${config.color}`} />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                className={`text-xs font-bold uppercase tracking-wider ${config.color}`}
                              >
                                {config.label}
                              </span>
                              {log.actor && (
                                <span className="text-[10px] text-muted bg-gray-100 px-1.5 py-0.5 rounded-md font-medium">
                                  {log.actor}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-700 mt-0.5 leading-relaxed">
                              {log.details || "No details"}
                            </p>
                            {log.entityId && (
                              <span className="text-[10px] text-gray-400 font-mono mt-1 block">
                                ID: {log.entityId.split("-")[0]}
                              </span>
                            )}
                          </div>

                          {/* Time */}
                          <div className="text-right shrink-0">
                            <div className="text-xs text-muted font-medium">
                              {formatRelativeTime(log.createdAt)}
                            </div>
                            <div className="text-[10px] text-gray-300 mt-0.5 hidden sm:block">
                              {formatFullDate(log.createdAt)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Activity className="w-5 h-5 text-gray-300" />
              </div>
              <p className="text-gray-900 font-semibold">No activity found</p>
              <p className="text-sm text-gray-400 mt-1">
                {searchTerm || filterAction !== "all"
                  ? "Try changing your search or filter."
                  : "Activity will appear here as events occur."}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 pb-4 flex items-center justify-between text-sm text-gray-400 border-t border-gray-100 pt-4">
          <span>
            Showing {filteredLogs.length} of {initialLogs.length} events
          </span>
          <span className="text-xs">Auto-cleaned after 30 days</span>
        </div>
      </div>
    </div>
  );
}
