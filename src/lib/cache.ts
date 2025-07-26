import cache from "memory-cache";

const cacheObj = new cache.Cache();

export const DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

export enum CacheKeys {
  VOCABULARY_DATA = "vocabulary-data",
  WORD_OF_THE_DAY = "word-of-the-day",
}

export function getCache<t>(key: CacheKeys): t | null {
  const cachedValue = cacheObj.get(key);
  return cachedValue ? (cachedValue as t) : null;
}

export function setCache<t>(key: CacheKeys, value: t, ttl: number): void {
  cacheObj.put(key, value, ttl);
}

export function clearCache(key: CacheKeys): void {
  cacheObj.del(key);
}

export function clearAllCache(): void {
  cacheObj.clear();
}

export function hasCache(key: CacheKeys): boolean {
  return cacheObj.get(key) !== null;
}
