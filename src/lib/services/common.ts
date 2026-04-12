export const delay = (ms: number) =>
    new Promise(resolve => setTimeout(resolve, ms));


export const randomDelay = <T>(min: number, max: number, payload?: T): Promise<T> =>
    new Promise(resolve => setTimeout(() => resolve(payload as T), Math.random() * (max - min) + min));
