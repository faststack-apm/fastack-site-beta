/**
 * Customer and package metrics data
 */

export interface CustomerPackage {
    id: string;
    name: string;
    basePrice: number; // in USD
    totalCustomers: number;
    averageMonthlyRevenue: number; // in USD
}

export const CUSTOMER_PACKAGES: CustomerPackage[] = [
    {
        id: "pkg-indie",
        name: "Indie",
        basePrice: 29,
        totalCustomers: 1245,
        averageMonthlyRevenue: 36015,
    },
    {
        id: "pkg-startup",
        name: "Startup",
        basePrice: 99,
        totalCustomers: 482,
        averageMonthlyRevenue: 47718,
    },
    {
        id: "pkg-business",
        name: "Business",
        basePrice: 299,
        totalCustomers: 128,
        averageMonthlyRevenue: 38272,
    },
];

export const getTotalCustomers = (): number => {
    return CUSTOMER_PACKAGES.reduce((sum, pkg) => sum + pkg.totalCustomers, 0);
};

export const getCustomerGrowthPercent = (): number => {
    // Simulated 7-day growth percentage
    return 12.5;
};

export const getTotalMonthlyRevenue = (): number => {
    return CUSTOMER_PACKAGES.reduce((sum, pkg) => sum + pkg.averageMonthlyRevenue, 0);
};

export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

export const formatNumber = (value: number): string => {
    return new Intl.NumberFormat("en-US").format(value);
};
