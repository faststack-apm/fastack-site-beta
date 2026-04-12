/**
 * Emulates a delay between a min and max value (in milliseconds).
 * This is used to simulate REST API calls as per project requirements.
 */
export const mockDelay = (min = 1000, max = 3000): Promise<void> => {
  const delay = Math.floor(Math.random() * (max - min + 1) + min);
  return new Promise((resolve) => setTimeout(resolve, delay));
};
