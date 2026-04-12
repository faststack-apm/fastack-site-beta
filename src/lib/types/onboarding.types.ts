export type UserRole = "technical" | "marketing" | "power_user";

export type IngestionMethod = "manual" | "api" | "otel";

export type IngestionStatus =
    | "not_started"
    | "pending"
    | "testing"
    | "success"
    | "failed";

export interface SessionStartResponse {
    sessionId: string;
}

export interface ChatMessageRequest {
    sessionId: string;
    message: string;
}

export interface SignupRequest {
    sessionId: string;
    planOverride?: string;
    additionalInviteEmails?: string[];
}

export interface AiConnectivityRequest {
    endpoint: string;
    apiKey: string;
    modelId: string;
}

export interface OtelConnectivityRequest {
    collectorEndpoint: string;
    protocol: string;
    port: number;
}

export interface FormatScore {
    format: string;
    confidence: number;
    matchedLines: number;
    sampledLines: number;
}

export interface LogFormatDetectionResult {
    detectedFormat: string;
    confidence: number;
    sampledLines: number;
    matchedLines: number;
    detectedFields: string[];
    parsedPreview: Record<string, string>[];
    ambiguous: boolean;
    candidateFormats: FormatScore[];
}

export interface ProductPackage {
    id: string;
    name: string;
    description: string;
    monthlySubscriptionPrice: number;
    logEventMaxCount: number;
    logEventAdditionalCharge: number;
    logEventAdditionalCount: number;
    alertNotificationEventCount: number;
    alertNotificationEventCharge: number;
    alertNotificationAdditionalEventCount: number;
}

export interface OnboardingState {
    sessionId: string;

    user: {
        firstName?: string;
        lastName?: string;
        email?: string;
        phone?: string;
        role?: UserRole;
    };

    organization: {
        name?: string;
        domains: string[];
        teamMembers: {
            name: string;
            email?: string;
        }[];
    };

    product: {
        tier?: string;
        expectedMonthlyLogs?: number;
        estimatedOverageCost?: number;
        totalEstimatedCost?: number;
    };

    ingestion: {
        method?: IngestionMethod;
        status: IngestionStatus;
        lastTestAt?: string;
        logsReceived?: number;
        lastError?: string;
    };

    billing: {
        contactName?: string;
        contactEmail?: string;
    };

    metadata: {
        createdAt: string;
        updatedAt: string;
        completed: boolean;
    };
}