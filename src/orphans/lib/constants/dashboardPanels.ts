export type PanelCategory =
  | "metric"
  | "chart"
  | "list"
  | "status"
  | "grid"
  | "ai";

export interface PanelDefinition {
  id: string;
  title: string;
  category: PanelCategory;
  description?: string;
  defaultWidth: number; // in grid units
  defaultHeight: number; // in grid units
  icon?: string; // lucide icon name
}

export const DEFAULT_DASHBOARD_PANELS: PanelDefinition[] = [
  // Metric Cards (each 1x1)
  {
    id: "response-time",
    title: "Response Time",
    category: "metric",
    description: "Average response time across services",
    defaultWidth: 1,
    defaultHeight: 1,
    icon: "Zap",
  },
  {
    id: "requests-sec",
    title: "Requests/sec",
    category: "metric",
    description: "Current request throughput",
    defaultWidth: 1,
    defaultHeight: 1,
    icon: "Activity",
  },
  {
    id: "error-rate",
    title: "Error Rate",
    category: "metric",
    description: "Percentage of failed requests",
    defaultWidth: 1,
    defaultHeight: 1,
    icon: "AlertCircle",
  },
  {
    id: "uptime",
    title: "Uptime",
    category: "metric",
    description: "System availability",
    defaultWidth: 1,
    defaultHeight: 1,
    icon: "CheckCircle",
  },
  {
    id: "active-users",
    title: "Active Users",
    category: "metric",
    description: "Current number of active users",
    defaultWidth: 1,
    defaultHeight: 1,
    icon: "Users",
  },

  // Performance Timeline (2x2 chart)
  {
    id: "performance-timeline",
    title: "Performance Timeline",
    category: "chart",
    description: "Historical response time and throughput trends",
    defaultWidth: 2,
    defaultHeight: 2,
    icon: "TrendingUp",
  },

  // System Status (1x2)
  {
    id: "system-status",
    title: "System Status",
    category: "status",
    description: "Health of infrastructure components",
    defaultWidth: 1,
    defaultHeight: 2,
    icon: "Server",
  },

  // Resource Usage (1x2)
  {
    id: "resource-usage",
    title: "Resource Usage",
    category: "status",
    description: "CPU, Memory, and Disk utilization",
    defaultWidth: 1,
    defaultHeight: 2,
    icon: "BarChart3",
  },

  // Traffic Usage Panel (2x1 chart)
  {
    id: "traffic-usage",
    title: "Traffic Usage",
    category: "chart",
    description: "Request volume and bandwidth analytics",
    defaultWidth: 2,
    defaultHeight: 1,
    icon: "BarChart2",
  },

  // Service Performance (2x2 line chart)
  {
    id: "service-performance",
    title: "Service Performance",
    category: "chart",
    description: "Calls and response time with drag-select analytics",
    defaultWidth: 2,
    defaultHeight: 2,
    icon: "LineChart",
  },

  // Request Distribution (1x1 donut)
  {
    id: "request-distribution",
    title: "Request Distribution",
    category: "chart",
    description: "Breakdown by HTTP methods",
    defaultWidth: 1,
    defaultHeight: 1,
    icon: "PieChart",
  },

  // Response Codes (1x1 donut)
  {
    id: "response-codes",
    title: "Response Codes",
    category: "chart",
    description: "Success rate and error distributions",
    defaultWidth: 1,
    defaultHeight: 1,
    icon: "PieChart",
  },

  // Ask Alice Panel (2x1 AI)
  {
    id: "ask-alice",
    title: "Ask Alice",
    category: "ai",
    description: "AI-powered insights and monitoring",
    defaultWidth: 2,
    defaultHeight: 1,
    icon: "Sparkles",
  },

  // System Overview (4x1 full-width row)
  {
    id: "system-overview",
    title: "System Overview",
    category: "metric",
    description: "High-level system health summary across all services",
    defaultWidth: 4,
    defaultHeight: 1,
    icon: "BarChart3",
  },

  // Services Grid (full width)
  {
    id: "services-grid",
    title: "Services",
    category: "grid",
    description: "Detailed status and metrics for all services",
    defaultWidth: 3,
    defaultHeight: 2,
    icon: "Grid3x3",
  },

  // Recent Alerts (1x2)
  {
    id: "recent-alerts",
    title: "Recent Alerts",
    category: "list",
    description: "Latest system alerts and notifications",
    defaultWidth: 1,
    defaultHeight: 2,
    icon: "Bell",
  },

  // Error Rate Trends (1x2)
  {
    id: "error-trends",
    title: "Error Rate Trends",
    category: "chart",
    description: "Historical error rate patterns",
    defaultWidth: 1,
    defaultHeight: 2,
    icon: "TrendingDown",
  },

  // Tasks (1x2)
  {
    id: "tasks",
    title: "System Tasks",
    category: "list",
    description: "System-driven tasks with dynamic priority levels",
    defaultWidth: 1,
    defaultHeight: 2,
    icon: "CheckSquare",
  },

  // SLA Alerts (1x2)
  {
    id: "sla-alerts",
    title: "SLA Violations",
    category: "list",
    description: "Real-time SLA violation alerts and incidents",
    defaultWidth: 1,
    defaultHeight: 2,
    icon: "AlertTriangle",
  },
];

// Default layout: order panels by their appearance in the dashboard
export const DEFAULT_PANEL_ORDER: string[] = DEFAULT_DASHBOARD_PANELS.map(
  (p) => p.id,
);

// Layout presets
export interface LayoutPreset {
  id: string;
  name: string;
  description: string;
  panelOrder: string[];
}

export const LAYOUT_PRESETS: LayoutPreset[] = [
  {
    id: "default",
    name: "Default Layout",
    description: "Balanced view with all panels",
    panelOrder: DEFAULT_PANEL_ORDER,
  },
  {
    id: "performance-focused",
    name: "Performance Focused",
    description: "Emphasizes performance metrics and trends",
    panelOrder: [
      "response-time",
      "requests-sec",
      "performance-timeline",
      "service-performance",
      "error-rate",
      "error-trends",
      "traffic-usage",
      "request-distribution",
      "response-codes",
      "system-status",
      "resource-usage",
      "uptime",
      "recent-alerts",
      "sla-alerts",
      "tasks",
      "ask-alice",
      "services-grid",
    ],
  },
  {
    id: "operational",
    name: "Operational Focus",
    description: "Emphasizes system health and alerts",
    panelOrder: [
      "sla-alerts",
      "tasks",
      "system-status",
      "resource-usage",
      "uptime",
      "recent-alerts",
      "error-rate",
      "error-trends",
      "response-time",
      "requests-sec",
      "performance-timeline",
      "service-performance",
      "services-grid",
      "traffic-usage",
      "request-distribution",
      "response-codes",
      "ask-alice",
    ],
  },
  {
    id: "data-explorer",
    name: "Data Explorer",
    description: "Emphasizes data visualization and analytics",
    panelOrder: [
      "service-performance",
      "performance-timeline",
      "request-distribution",
      "response-codes",
      "traffic-usage",
      "error-trends",
      "services-grid",
      "response-time",
      "requests-sec",
      "error-rate",
      "system-status",
      "resource-usage",
      "uptime",
      "recent-alerts",
      "sla-alerts",
      "tasks",
      "ask-alice",
    ],
  },
  {
    id: "quick-overview",
    name: "Quick Overview",
    description: "Minimal panels for high-level insights",
    panelOrder: [
      "response-time",
      "requests-sec",
      "error-rate",
      "uptime",
      "system-status",
      "sla-alerts",
      "tasks",
      "recent-alerts",
    ],
  },
];
