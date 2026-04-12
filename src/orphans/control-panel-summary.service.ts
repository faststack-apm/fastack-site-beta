import { CustomerSummaryResponse } from "@/vo/customer-summary-response";
import { FIVE_SECONDS, TEN_SECONDS } from "../constants/time.constants";
import { randomDelay } from "./common";
import { SupportTicketSummaryResponse } from "@/vo/support-ticket-summary-response";
import { EstRevenueSummaryResponse } from "@/vo/est-revenue-summary-response";

const mockCustomerSummaryResponse: CustomerSummaryResponse = {
    totalCustomerCount: 10,
    estMonthlyRevenue: 100,
    avgRevenuePerCustomer: 10,
    indieProductStats: {
        basePackagePrice: 10,
        totalCustomerCount: 10,
        avgMoRevenue: 10,
        estRevenuePerCustomer: 10,
        marketSharePct: 10,
    },
    startupProductStats: {
        basePackagePrice: 10,
        totalCustomerCount: 10,
        avgMoRevenue: 10,
        estRevenuePerCustomer: 10,
        marketSharePct: 10,
    },
    businessProductStats: {
        basePackagePrice: 10,
        totalCustomerCount: 10,
        avgMoRevenue: 10,
        estRevenuePerCustomer: 10,
        marketSharePct: 10,
    },
}

const mockEstRevenueSummaryResponse: EstRevenueSummaryResponse = {
    lastThreeDays: {
        indiePackageRevenueSummary: 10,
        startupPackageRevenueSummary: 10,
        businessPackageRevenueSummary: 10,
    },
    lastSevenDays: {
        indiePackageRevenueSummary: 10,
        startupPackageRevenueSummary: 10,
        businessPackageRevenueSummary: 10,
    },
    lastTwoweeks: {
        indiePackageRevenueSummary: 10,
        startupPackageRevenueSummary: 10,
        businessPackageRevenueSummary: 10,
    },
    lastSixMonths: {
        indiePackageRevenueSummary: 10,
        startupPackageRevenueSummary: 10,
        businessPackageRevenueSummary: 10,
    },
}

const mockSupportTicketSummaryResponse: SupportTicketSummaryResponse = {
    openTicketCount: 10,
    newTicketCount: 10,
}

export const getCustomerSummary = () => {
    return randomDelay(FIVE_SECONDS, TEN_SECONDS, mockCustomerSummaryResponse);
}

export const getEstimatedRevenueSummary = () => {
    return randomDelay(FIVE_SECONDS, TEN_SECONDS, mockEstRevenueSummaryResponse);
}

export const getSupportTicketSummary = () => {
    return randomDelay(FIVE_SECONDS, TEN_SECONDS, mockSupportTicketSummaryResponse);
}


