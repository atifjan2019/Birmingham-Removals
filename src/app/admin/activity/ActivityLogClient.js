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
  X,
  MapPin,
  User,
  Phone,
  Mail,
  BedDouble,
  Package,
  ArrowRight,
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
  "customer.deleted": {
    icon: Trash2,
    color: "text-orange-600",
    bg: "bg-orange-50 border-orange-200",
    label: "Customer Deleted",
  },
};

const DEFAULT_CONFIG = {
  icon: Activity,
  color: "text-gray-600",
  bg: "bg-gray-50 border-gray-200",
  label: "Activity",
};

function parseDetails(details) {
  if (!details) return null;
  try {
    return JSON.parse(details);
  } catch {
    return { summary: details };
  }
}

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
    second: "2-digit",
  });
}

/* ──────────────────── Detail Modal ──────────────────── */
function ActivityDetailModal({ log, onClose }) {
  if (!log) return null;

  const config = ACTION_CONFIG[log.action] || DEFAULT_CONFIG;
  const Icon = config.icon;
  const parsed = parseDetails(log.details);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
          <div
            className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${config.bg}`}
          >
            <Icon className={`w-5 h-5 ${config.color}`} />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-gray-900 font-[family-name:var(--font-space)]">
              {config.label}
            </h2>
            <p className="text-xs text-muted">
              {formatFullDate(log.createdAt)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* Summary */}
          {parsed?.summary && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="text-xs text-muted font-semibold uppercase tracking-wider mb-1.5">
                What happened
              </div>
              <p className="text-sm font-medium text-gray-900">
                {parsed.summary}
              </p>
            </div>
          )}

          {/* Meta Row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <div className="text-[10px] text-muted font-semibold uppercase tracking-wider mb-1">
                Performed by
              </div>
              <div className="text-sm font-semibold text-gray-900 capitalize">
                {log.actor || "system"}
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <div className="text-[10px] text-muted font-semibold uppercase tracking-wider mb-1">
                Customer
              </div>
              <div className="text-sm font-semibold text-gray-900">
                {typeof parsed?.customer === "object"
                  ? parsed.customer.fullName
                  : typeof parsed?.customer === "string"
                  ? parsed.customer
                  : "—"}
              </div>
            </div>
          </div>

          {/* Status Change */}
          {parsed?.previousStatus && parsed?.newStatus && (
            <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
              <div className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-2">
                Status Change
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-sm font-semibold text-gray-600">
                  {parsed.previousStatus}
                </span>
                <ArrowRight className="w-4 h-4 text-blue-400" />
                <span className="px-3 py-1.5 rounded-lg bg-blue-100 border border-blue-200 text-sm font-bold text-blue-700">
                  {parsed.newStatus}
                </span>
              </div>
            </div>
          )}

          {/* Customer Info */}
          {parsed?.customer && typeof parsed.customer === "object" && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="text-xs text-muted font-semibold uppercase tracking-wider mb-3">
                Customer Details
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-muted" />
                  <span className="text-gray-900 font-medium">
                    {parsed.customer.fullName}
                  </span>
                </div>
                {parsed.customer.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted" />
                    <span className="text-gray-700">
                      {parsed.customer.phone}
                    </span>
                  </div>
                )}
                {parsed.customer.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted" />
                    <span className="text-gray-700">
                      {parsed.customer.email}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* If customer is just a string name */}
          {parsed?.customer && typeof parsed.customer === "string" && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="text-xs text-muted font-semibold uppercase tracking-wider mb-1.5">
                Customer
              </div>
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-muted" />
                <span className="text-gray-900 font-medium">
                  {parsed.customer}
                </span>
              </div>
            </div>
          )}

          {/* Move Details */}
          {(parsed?.moveType || parsed?.route || parsed?.fromPostcode) && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="text-xs text-muted font-semibold uppercase tracking-wider mb-3">
                Move Details
              </div>
              <div className="space-y-2">
                {parsed.moveType && (
                  <div className="flex items-center gap-2 text-sm">
                    <Package className="w-4 h-4 text-muted" />
                    <span className="text-gray-900 font-medium capitalize">
                      {parsed.moveType?.replace(/-/g, " ")}
                    </span>
                    {parsed.bedrooms != null && (
                      <span className="text-muted">
                        • {parsed.bedrooms === 0 ? "Studio" : `${parsed.bedrooms} bed`}
                      </span>
                    )}
                  </div>
                )}
                {(parsed.route || parsed.fromPostcode) && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted" />
                    <span className="text-gray-900">
                      {parsed.route ||
                        `${parsed.fromPostcode} → ${parsed.toPostcode}`}
                    </span>
                  </div>
                )}
                {parsed.moveDate && (
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarDays className="w-4 h-4 text-muted" />
                    <span className="text-gray-700">
                      {new Date(parsed.moveDate).toLocaleDateString("en-GB", {
                        weekday: "short",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Extras */}
          {parsed?.extras && parsed.extras.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="text-xs text-muted font-semibold uppercase tracking-wider mb-2">
                Extras
              </div>
              <div className="flex flex-wrap gap-2">
                {parsed.extras.map((ex, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-md capitalize"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Raw action type */}
          <div className="text-[10px] text-gray-900 font-mono border-t border-gray-100 pt-3">
            action: {log.action} | logged: {formatFullDate(log.createdAt)}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          <button
            onClick={onClose}
            className="w-full px-6 py-2.5 bg-gray-900 text-white rounded-xl shadow-lg shadow-gray-900/20 hover:bg-gray-800 transition-colors font-semibold text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────── Main Component ──────────────────── */
export default function ActivityLogClient({ initialLogs, actionTypes }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAction, setFilterAction] = useState("all");
  const [selectedLog, setSelectedLog] = useState(null);

  const filteredLogs = initialLogs.filter((log) => {
    const parsed = parseDetails(log.details);
    const searchableText = [
      parsed?.summary || log.details || "",
      log.entityId || "",
      log.actor || "",
      parsed?.customer?.fullName || (typeof parsed?.customer === "string" ? parsed.customer : ""),
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      searchTerm === "" || searchableText.includes(searchTerm.toLowerCase());

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
                      const parsed = parseDetails(log.details);
                      const summary =
                        parsed?.summary || log.details || "No details";

                      return (
                        <div
                          key={log.id}
                          onClick={() => setSelectedLog(log)}
                          className="relative group flex items-start gap-3 py-3 px-3 rounded-xl hover:bg-gray-50/80 transition-colors -ml-3 cursor-pointer"
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
                              {summary}
                            </p>
                            {log.entityId && (
                              <span className="text-[10px] text-gray-400 font-mono mt-1 block">
                                ID: {log.entityId.split("-")[0]}
                              </span>
                            )}
                          </div>

                          {/* Time + click hint */}
                          <div className="text-right shrink-0">
                            <div className="text-xs text-muted font-medium">
                              {formatRelativeTime(log.createdAt)}
                            </div>
                            <div className="text-[10px] text-gray-300 mt-0.5 hidden sm:block">
                              {formatFullDate(log.createdAt)}
                            </div>
                            <div className="text-[10px] text-primary font-medium mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              View details →
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

      {/* Detail Modal */}
      {selectedLog && (
        <ActivityDetailModal
          log={selectedLog}
          onClose={() => setSelectedLog(null)}
        />
      )}
    </div>
  );
}
