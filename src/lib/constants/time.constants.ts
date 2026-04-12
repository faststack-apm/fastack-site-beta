export const ONE_SECOND = 1000;
export const THREE_SECONDS = 3 * ONE_SECOND;
export const FIVE_SECONDS = 5 * ONE_SECOND;
export const TEN_SECONDS = 10 * ONE_SECOND;
export const THIRTY_SECONDS = 30 * ONE_SECOND;
export const ONE_MINUTE = 60 * ONE_SECOND;
export const TWO_MINUTES = 2 * ONE_MINUTE;
export const FIVE_MINUTES = 5 * ONE_MINUTE;
export const TEN_MINUTES = 10 * ONE_MINUTE;
export const THIRTY_MINUTES = 30 * ONE_MINUTE;
export const ONE_HOUR = 60 * ONE_MINUTE;
export const TWO_HOURS = 2 * ONE_HOUR;
export const FOUR_HOURS = 4 * ONE_HOUR;
export const EIGHT_HOURS = 8 * ONE_HOUR;
export const TWELVE_HOURS = 12 * ONE_HOUR;
export const ONE_DAY = 24 * ONE_HOUR;
export const ONE_WEEK = 7 * ONE_DAY;
export const ONE_MONTH = 30 * ONE_DAY;
export const ONE_YEAR = 365 * ONE_DAY;

export enum TimeRange {
    Last30Seconds = THIRTY_SECONDS,
    LastMinute = ONE_MINUTE,
    Last5Minutes = FIVE_MINUTES,
    Last30Minutes = THIRTY_MINUTES,
    LastHour = ONE_HOUR,
    Last4Hours = FOUR_HOURS,
    Last12Hours = TWELVE_HOURS,
    Last24Hours = ONE_DAY,
    Last7Days = ONE_WEEK,
    Last30Days = ONE_MONTH,
}

