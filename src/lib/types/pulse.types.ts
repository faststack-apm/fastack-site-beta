export interface PulsePackageOffering {
  id: string;
  name: string;
  description: string;
  monthlySubscriptionPrice: number;
  endpointLimit: number;
  syntheticTransactionLimit: number;
  alertNotificationEventCount: number;
  alertNotificationEventCharge: number;
  alertNotificationAdditionalEventCount: number;
}

export interface EndpointDefinition {
  id: string;
  name: string;
  description?: string;
  url: string;
  type: "single" | "multi_step";
  stepUrls?: string[];
  validated: boolean;
  lastStatusCode?: number;
  responseTimeMs?: number;
}

export interface StepValidationResult {
  url: string;
  success: boolean;
  statusCode?: number;
  responseTimeMs?: number;
  errorMessage?: string;
}

export interface EndpointValidationResult {
  success: boolean;
  url: string;
  statusCode?: number;
  responseTimeMs?: number;
  errorMessage?: string;
  stepResults?: StepValidationResult[];
}

export interface PulseSignupRequest {
  sessionId: string;
  planOverride?: string;
  additionalInviteEmails?: string[];
}

export interface PulseState {
  sessionId: string;

  user: {
    name?: string;
    email?: string;
    phone?: string;
    role?: string;
  };

  organization: {
    name?: string;
    teamMembers: { email: string }[];
  };

  product: {
    tier?: string;
  };

  endpoints: EndpointDefinition[];

  metadata: {
    createdAt: string;
    updatedAt: string;
    completed: boolean;
  };
}
