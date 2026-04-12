import { mockDelay } from "@/app/utils/mock-utils";
import { EndpointValidationResult } from "@/lib/types/pulse.types";

/**
 * Pulse Service handles endpoint validation and management.
 * Implements mock logic as per project requirements (CLAUDE.md).
 */
export const pulseService = {
  /**
   * Validates a single or multi-step endpoint.
   * Simulates a network call with a random delay.
   */
  validateEndpoint: async (payload: {
    name: string;
    url: string;
    type: "single" | "multi_step";
    stepUrls?: string[];
  }): Promise<EndpointValidationResult> => {
    // Simulate network latency
    await mockDelay(1000, 2500);

    const isSuccess = Math.random() > 0.1; // 90% success rate for mock
    const responseTimeMs = Math.floor(Math.random() * 400) + 100;

    if (payload.type === "multi_step" && payload.stepUrls) {
      const stepResults = payload.stepUrls.map((url) => ({
        url,
        success: true,
        statusCode: 200,
        responseTimeMs: Math.floor(Math.random() * 200) + 50,
      }));

      return {
        success: isSuccess,
        url: payload.url,
        statusCode: isSuccess ? 200 : 500,
        responseTimeMs: stepResults.reduce((acc, r) => acc + (r.responseTimeMs || 0), 0),
        errorMessage: isSuccess ? undefined : "One or more steps failed validation.",
        stepResults,
      };
    }

    return {
      success: isSuccess,
      url: payload.url,
      statusCode: isSuccess ? 200 : 500,
      responseTimeMs,
      errorMessage: isSuccess ? undefined : "Endpoint unreachable or returned non-200 status.",
    };
  },
};
