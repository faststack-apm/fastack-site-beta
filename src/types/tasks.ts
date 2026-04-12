/**
 * Task severity status
 * - default: Normal task
 * - warning: Time-sensitive task (yellow)
 * - critical: Overdue task (red)
 */
export type TaskSeverity = "default" | "warning" | "critical";

/**
 * System-driven task
 */
export interface Task {
  id: string;
  title: string;
  description: string;
  severity: TaskSeverity;
  createdAt: Date;
  dueDate?: Date;
  link?: {
    label: string;
    href: string;
  };
}

/**
 * SLA violation alert
 */
export interface Alert {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  slaViolationType: "response-time" | "error-rate" | "availability";
  traceSummary: {
    traceId: string;
    duration: number;
    errorMessage?: string;
    affectedEndpoint?: string;
  };
  detailsLink?: {
    label: string;
    href: string;
  };
}

/**
 * Generic item for master-detail list (can be Task or Alert)
 */
export type MasterDetailItem = Task | Alert;

/**
 * Type guard to check if item is a Task
 */
export const isTask = (item: MasterDetailItem): item is Task => {
  return "severity" in item && "dueDate" in item;
};

/**
 * Type guard to check if item is an Alert
 */
export const isAlert = (item: MasterDetailItem): item is Alert => {
  return "traceSummary" in item && "slaViolationType" in item;
};
