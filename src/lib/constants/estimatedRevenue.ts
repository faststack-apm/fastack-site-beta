/**
 * Estimated Revenue metrics with time-series data
 */

export type TimeWindowType = "3d" | "7d" | "14d" | "180d";

export const TIME_WINDOWS: Record<
    TimeWindowType,
    { label: string; days: number }
> = {
    "3d": { label: "Last 3 days", days: 3 },
    "7d": { label: "Last 7 days", days: 7 },
    "14d": { label: "Last 2 weeks", days: 14 },
    "180d": { label: "Last 6 months", days: 180 },
};

export interface DailyRevenueByPackage {
    indie: number;
    startup: number;
    business: number;
}

export interface DailyRevenueData {
    date: string;
    timestamp: number;
    totalRevenue: number;
    byPackage: DailyRevenueByPackage;
}

/**
 * Generate mock revenue data for the past 180 days
 * Base revenue is derived from customer metrics, with daily variations
 */
const generateHistoricalRevenue = (): DailyRevenueData[] => {
    const data: DailyRevenueData[] = [];
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    // Daily revenue totals based on customer packages
    // Indie: 1245 customers × $29 = $36,105/day
    // Startup: 482 customers × $99 = $47,718/day
    // Business: 128 customers × $299 = $38,272/day
    // Total baseline: ~$122,095/day

    const baseRevenue = {
        indie: 36105,
        startup: 47718,
        business: 38272,
    };

    for (let i = 180; i >= 0; i--) {
        const timestamp = now - i * oneDay;
        const date = new Date(timestamp);

        // Add some realistic variation (±10% to ±15%)
        const variationFactor = 0.85 + Math.random() * 0.3;

        const indiRevenue = Math.round(baseRevenue.indie * variationFactor);
        const startupRevenue = Math.round(baseRevenue.startup * variationFactor);
        const businessRevenue = Math.round(baseRevenue.business * variationFactor);

        const totalRevenue = indiRevenue + startupRevenue + businessRevenue;

        data.push({
            date: date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            }),
            timestamp,
            totalRevenue,
            byPackage: {
                indie: indiRevenue,
                startup: startupRevenue,
                business: businessRevenue,
            },
        });
    }

    return data;
};

export const HISTORICAL_REVENUE_DATA = generateHistoricalRevenue();

/**
 * Get revenue data for a specific time window
 */
export const getRevenueByTimeWindow = (
    timeWindow: TimeWindowType,
): DailyRevenueData[] => {
    const days = TIME_WINDOWS[timeWindow].days;
    return HISTORICAL_REVENUE_DATA.slice(-days);
};

/**
 * Calculate total estimated revenue for a time period
 */
export const getTotalEstimatedRevenue = (data: DailyRevenueData[]): number => {
    return data.reduce((sum, item) => sum + item.totalRevenue, 0);
};

/**
 * Calculate average daily revenue
 */
export const getAverageDailyRevenue = (data: DailyRevenueData[]): number => {
    if (data.length === 0) return 0;
    return Math.round(getTotalEstimatedRevenue(data) / data.length);
};

/**
 * Calculate growth percentage for the time period vs previous period
 */
export const calculateRevenueGrowth = (
    currentData: DailyRevenueData[],
    previousData: DailyRevenueData[],
): number => {
    const currentTotal = getTotalEstimatedRevenue(currentData);
    const previousTotal = getTotalEstimatedRevenue(previousData);

    if (previousTotal === 0) return 0;
    return Number(
        (((currentTotal - previousTotal) / previousTotal) * 100).toFixed(1),
    );
};

/**
 * Get the previous period data for comparison
 */
export const getPreviousPeriodData = (
    timeWindow: TimeWindowType,
): DailyRevenueData[] => {
    const days = TIME_WINDOWS[timeWindow].days;
    const startIndex = Math.max(0, HISTORICAL_REVENUE_DATA.length - days * 2);
    const endIndex = HISTORICAL_REVENUE_DATA.length - days;
    return HISTORICAL_REVENUE_DATA.slice(startIndex, endIndex);
};

/**
 * Format currency for display
 */
export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

/**
 * Get revenue breakdown summary for a data set
 */
export const getRevenueBreakdown = (data: DailyRevenueData[]) => {
    const breakdown = {
        indie: 0,
        startup: 0,
        business: 0,
    };

    data.forEach((item) => {
        breakdown.indie += item.byPackage.indie;
        breakdown.startup += item.byPackage.startup;
        breakdown.business += item.byPackage.business;
    });

    return breakdown;
};
