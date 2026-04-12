/**
 * Support Tickets Management
 */

export type TicketType = "conversation" | "support-ticket";
export type SeverityLevel = "low" | "medium" | "high";
export type TicketStatus = "open" | "in-progress" | "resolved" | "closed";

export interface SupportTicket {
    id: string;
    title: string;
    description: string;
    type: TicketType;
    severity?: SeverityLevel; // Only for support-ticket type
    status: TicketStatus;
    customerEmail: string;
    customerName: string;
    assignedTo?: string; // Support team member name
    createdAt: Date;
    updatedAt: Date;
    tags: string[];
    messages: number; // Count of messages/replies
}

export const SEVERITY_LEVELS: Record<
    SeverityLevel,
    { label: string; color: string }
> = {
    low: { label: "Low", color: "bg-blue-500" },
    medium: { label: "Medium", color: "bg-amber-500" },
    high: { label: "High", color: "bg-red-500" },
};

export const TICKET_TYPES: Record<
    TicketType,
    { label: string; description: string }
> = {
    conversation: {
        label: "Conversation",
        description: "General inquiry or question",
    },
    "support-ticket": {
        label: "Support Ticket",
        description: "Issue requiring resolution",
    },
};

export const TICKET_STATUSES: Record<
    TicketStatus,
    { label: string; color: string }
> = {
    open: { label: "Open", color: "bg-blue-500" },
    "in-progress": { label: "In Progress", color: "bg-amber-500" },
    resolved: { label: "Resolved", color: "bg-emerald-500" },
    closed: { label: "Closed", color: "bg-slate-500" },
};

export const MOCK_SUPPORT_TICKETS: SupportTicket[] = [
    {
        id: "ticket-001",
        title: "API Response Time Issues",
        description:
            "Users experiencing slow response times on the billing API. Issue started approximately 2 hours ago.",
        type: "support-ticket",
        severity: "high",
        status: "in-progress",
        customerEmail: "john@acme-corp.com",
        customerName: "John Smith",
        assignedTo: "Sarah Johnson",
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
        updatedAt: new Date(Date.now() - 600000), // 10 minutes ago
        tags: ["api", "performance", "urgent"],
        messages: 8,
    },
    {
        id: "ticket-002",
        title: "Feature Request: Custom Alerts",
        description:
            "Would like to request the ability to set custom thresholds for alert notifications based on business rules.",
        type: "conversation",
        status: "open",
        customerEmail: "jane@techventure.io",
        customerName: "Jane Doe",
        assignedTo: "Mike Chen",
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        updatedAt: new Date(Date.now() - 3600000), // 1 hour ago
        tags: ["feature-request", "alerts"],
        messages: 3,
    },
    {
        id: "ticket-003",
        title: "Database Connection Pool Errors",
        description:
            "Getting intermittent 'connection pool exhausted' errors when scaling up. Database connections seem to be leaking.",
        type: "support-ticket",
        severity: "high",
        status: "resolved",
        customerEmail: "admin@startup-inc.com",
        customerName: "Admin Team",
        assignedTo: "Robert Martinez",
        createdAt: new Date(Date.now() - 259200000), // 3 days ago
        updatedAt: new Date(Date.now() - 43200000), // 12 hours ago
        tags: ["database", "infrastructure", "performance"],
        messages: 12,
    },
    {
        id: "ticket-004",
        title: "Dashboard Not Loading",
        description:
            "Getting a blank screen when trying to access the dashboard. No errors in browser console.",
        type: "support-ticket",
        severity: "medium",
        status: "in-progress",
        customerEmail: "support@enterprise.com",
        customerName: "Enterprise Support",
        assignedTo: "Sarah Johnson",
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        updatedAt: new Date(Date.now() - 300000), // 5 minutes ago
        tags: ["ui", "frontend", "dashboard"],
        messages: 5,
    },
    {
        id: "ticket-005",
        title: "Question about Integration",
        description:
            "How can we integrate the APM with our existing monitoring system?",
        type: "conversation",
        status: "open",
        customerEmail: "ops@midsize.co",
        customerName: "Operations Team",
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        updatedAt: new Date(Date.now() - 172800000), // 2 days ago
        tags: ["integration", "documentation"],
        messages: 1,
    },
    {
        id: "ticket-006",
        title: "Memory Leak in SDK",
        description:
            "Detected a memory leak in the latest SDK version. Memory usage grows over time without release.",
        type: "support-ticket",
        severity: "high",
        status: "open",
        customerEmail: "dev@webapps.com",
        customerName: "WebApps Dev Team",
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
        updatedAt: new Date(Date.now() - 7200000), // 2 hours ago
        tags: ["sdk", "memory-leak", "bug"],
        messages: 4,
    },
    {
        id: "ticket-007",
        title: "Upgrade to Enterprise Plan",
        description:
            "Looking to upgrade to the enterprise plan and need information about custom SLAs.",
        type: "conversation",
        status: "open",
        customerEmail: "sales@future-tech.io",
        customerName: "Future Tech Sales",
        assignedTo: "Mike Chen",
        createdAt: new Date(Date.now() - 345600000), // 4 days ago
        updatedAt: new Date(Date.now() - 86400000), // 1 day ago
        tags: ["sales", "upgrade", "enterprise"],
        messages: 2,
    },
    {
        id: "ticket-008",
        title: "Incorrect Metric Values",
        description:
            "Response time metrics appear to be calculated incorrectly. Values don't match our internal monitoring.",
        type: "support-ticket",
        severity: "medium",
        status: "open",
        customerEmail: "metrics@dataflow.com",
        customerName: "DataFlow Analytics",
        createdAt: new Date(Date.now() - 14400000), // 4 hours ago
        updatedAt: new Date(Date.now() - 14400000), // 4 hours ago
        tags: ["metrics", "accuracy", "calculation"],
        messages: 2,
    },
    {
        id: "ticket-009",
        title: "Billing Invoice Issue",
        description:
            "Last month's invoice shows incorrect charges. Please review and provide corrected invoice.",
        type: "support-ticket",
        severity: "medium",
        status: "resolved",
        customerEmail: "billing@smallbiz.net",
        customerName: "SmallBiz",
        assignedTo: "Sarah Johnson",
        createdAt: new Date(Date.now() - 604800000), // 1 week ago
        updatedAt: new Date(Date.now() - 432000000), // 5 days ago
        tags: ["billing", "invoice"],
        messages: 7,
    },
    {
        id: "ticket-010",
        title: "API Rate Limiting",
        description:
            "Getting rate limited at 1000 req/min but plan allows 5000. Can this be reset?",
        type: "conversation",
        status: "resolved",
        customerEmail: "api@devshop.org",
        customerName: "DevShop API Team",
        assignedTo: "Robert Martinez",
        createdAt: new Date(Date.now() - 518400000), // 6 days ago
        updatedAt: new Date(Date.now() - 432000000), // 5 days ago
        tags: ["api", "rate-limit", "account"],
        messages: 4,
    },
];

export const generateId = (prefix: string): string => {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

export const formatDateTime = (date: Date): string => {
    return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export const getSeverityLabel = (severity: SeverityLevel): string => {
    return SEVERITY_LEVELS[severity].label;
};

export const getStatusLabel = (status: TicketStatus): string => {
    return TICKET_STATUSES[status].label;
};

export const getTypeLabel = (type: TicketType): string => {
    return TICKET_TYPES[type].label;
};

/**
 * Get common tags across all tickets for filtering
 */
export const getAllTags = (tickets: SupportTicket[]): string[] => {
    const tagSet = new Set<string>();
    tickets.forEach((ticket) => {
        ticket.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
};

/**
 * Filter tickets by status
 */
export const filterByStatus = (
    tickets: SupportTicket[],
    status: TicketStatus,
): SupportTicket[] => {
    return tickets.filter((t) => t.status === status);
};

/**
 * Filter tickets by type
 */
export const filterByType = (
    tickets: SupportTicket[],
    type: TicketType,
): SupportTicket[] => {
    return tickets.filter((t) => t.type === type);
};

/**
 * Filter support tickets by severity
 */
export const filterBySeverity = (
    tickets: SupportTicket[],
    severity: SeverityLevel,
): SupportTicket[] => {
    return tickets.filter(
        (t) => t.type === "support-ticket" && t.severity === severity,
    );
};

/**
 * Get high priority tickets (high severity + open/in-progress)
 */
export const getHighPriorityTickets = (
    tickets: SupportTicket[],
): SupportTicket[] => {
    return tickets.filter(
        (t) =>
            t.type === "support-ticket" &&
            t.severity === "high" &&
            (t.status === "open" || t.status === "in-progress"),
    );
};

/**
 * Count tickets by status
 */
export const countByStatus = (
    tickets: SupportTicket[],
): Record<TicketStatus, number> => {
    return {
        open: tickets.filter((t) => t.status === "open").length,
        "in-progress": tickets.filter((t) => t.status === "in-progress").length,
        resolved: tickets.filter((t) => t.status === "resolved").length,
        closed: tickets.filter((t) => t.status === "closed").length,
    };
};
