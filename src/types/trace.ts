// Base Event Type
export interface BaseEvent {
  id: string;
  name: string;
  timestamp: number;
  type: string;
  duration: number;
  status: "success" | "error" | "warning";
}

// Specific Event Types
export interface ApiCallEntryPoint extends BaseEvent {
  endpoint: string;
  method: string;
}

export interface MethodCall extends BaseEvent {
  childCalls: BaseEvent[];
  entryTimestamp: number;
  exitTimestamp: number;
}

export interface OrmFetchOperation extends BaseEvent {
  table: string;
  query: string;
  rowsReturned: number;
}

export interface RemoteApiCallOperation extends BaseEvent {
  endpoint: string;
  statusCode: number;
  responseTime: number;
}

export interface MongoDbFetchOperation extends BaseEvent {
  collection: string;
  query: string;
  documentsReturned: number;
}

export interface AiApiCallOperation extends BaseEvent {
  model: string;
  tokens: number;
  responseTime: number;
}

// Trace Type
export interface Trace {
  id: string;
  traceId: string;
  timestamp: number;
  totalExecutionTime: number;
  status: "success" | "error" | "warning";
  entryPoint: string;
  childEvents: BaseEvent[];
}

// Mock Data Generator
const eventNames = [
  "Database Query",
  "API Call",
  "Cache Lookup",
  "Authentication",
  "Validation",
  "Transformation",
  "Serialization",
  "Logger",
  "Metrics Collection",
  "Error Handling",
];

const operationTypes = [
  "orm_fetch",
  "remote_api_call",
  "method_call",
  "mongodb_fetch",
  "ai_api_call",
  "cache_operation",
];

const endpoints = [
  "/api/users",
  "/api/products",
  "/api/orders",
  "/api/analytics",
  "/api/billing",
];

const statuses: ("success" | "error" | "warning")[] = [
  "success",
  "success",
  "success",
  "warning",
  "error",
];

function getRandomStatus(): "success" | "error" | "warning" {
  return statuses[Math.floor(Math.random() * statuses.length)];
}

function generateRandomEvent(depth = 0): BaseEvent {
  const type =
    operationTypes[Math.floor(Math.random() * operationTypes.length)];
  const timestamp = Date.now() + Math.random() * 10000;
  const duration = Math.floor(Math.random() * 500) + 10;
  const id = `event-${Math.random().toString(36).substr(2, 9)}`;
  const status = getRandomStatus();

  const baseEvent: BaseEvent = {
    id,
    name: eventNames[Math.floor(Math.random() * eventNames.length)],
    timestamp,
    duration,
    status,
    type,
  };

  if (type === "method_call" && depth < 3) {
    const childCount = Math.floor(Math.random() * 5) + 1;
    const childCalls: BaseEvent[] = [];
    for (let i = 0; i < childCount; i++) {
      childCalls.push(generateRandomEvent(depth + 1));
    }
    return {
      ...baseEvent,
      childCalls,
      entryTimestamp: timestamp,
      exitTimestamp: timestamp + duration,
    } as MethodCall;
  }

  return baseEvent;
}

function generateTrace(id: number): Trace {
  const timestamp = Date.now() - Math.random() * 3600000; // Last hour
  const eventCount = Math.floor(Math.random() * 50) + 50; // 50-100 events
  const childEvents: BaseEvent[] = [];

  for (let i = 0; i < eventCount; i++) {
    childEvents.push(generateRandomEvent());
  }

  const totalExecutionTime = childEvents.reduce(
    (sum, evt) => sum + evt.duration,
    0,
  );

  return {
    id: `trace-${id}`,
    traceId: `trace-${Math.random().toString(36).substr(2, 9)}`,
    timestamp,
    totalExecutionTime,
    status: getRandomStatus(),
    entryPoint: endpoints[Math.floor(Math.random() * endpoints.length)],
    childEvents,
  };
}

export function generateMockTraces(count: number = 100): Trace[] {
  const traces: Trace[] = [];
  for (let i = 0; i < count; i++) {
    traces.push(generateTrace(i + 1));
  }
  // Sort by timestamp descending (newest first)
  return traces.sort((a, b) => b.timestamp - a.timestamp);
}
