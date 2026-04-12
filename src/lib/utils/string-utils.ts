
/**
 * Validates if the given string is a valid email address.
 * @param email The string to validate
 * @returns true if email is valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const isValidPhoneNumber = (phoneNumber: string): boolean => {
    if (!phoneNumber) return false;
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    return phoneRegex.test(phoneNumber);
};

export const formatPhoneNumber = (value: string): string => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
        return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(
        6,
        10
    )}`;
};


export const capitalizeFirstLetter = (str: string): string => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const capitalizeWords = (str: string): string => {
    if (!str) return str;
    return str.split(" ").map(capitalizeFirstLetter).join(" ");
};

export const toTitleCase = (str: string): string => {
    if (!str) return str;
    return str.split(" ").map(capitalizeFirstLetter).join(" ");
};

/** Given an numeric value representing a timestamp, return the formated date and time */
export const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleString();
};

/** Given an date, return the date as a formatted date and time */
export const formatDate = (date: Date): string => {
    return date.toLocaleDateString();
};