interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiresIn: number;
}

type CacheMap = Map<string, CacheItem<unknown>>;

class Cache {
  private static instance: Cache;
  private cache: CacheMap;
  private readonly DEFAULT_EXPIRATION = 5 * 60 * 1000; // 5 minutes

  private constructor() {
    this.cache = new Map();
  }

  public static getInstance(): Cache {
    if (!Cache.instance) {
      Cache.instance = new Cache();
    }
    return Cache.instance;
  }

  public set<T>(key: string, data: T, expiresIn: number = this.DEFAULT_EXPIRATION): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiresIn,
    });
  }

  public get<T>(key: string): T | null {
    const item = this.cache.get(key);

    if (!item) {
      return null;
    }

    const isExpired = Date.now() - item.timestamp > item.expiresIn;

    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  public delete(key: string): void {
    this.cache.delete(key);
  }

  public clear(): void {
    this.cache.clear();
  }

  public has(key: string): boolean {
    return this.cache.has(key);
  }

  public getExpirationTime(key: string): number | null {
    const item = this.cache.get(key);
    if (!item) {
      return null;
    }
    return item.expiresIn - (Date.now() - item.timestamp);
  }
}

export const cache = Cache.getInstance();

type MethodDecorator = (
  target: object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) => PropertyDescriptor;

// Cache decorator for API calls
export function withCache(expiresIn?: number): MethodDecorator {
  return function (
    target: object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: unknown[]): Promise<unknown> {
      const cacheKey = `${String(propertyKey)}-${JSON.stringify(args)}`;
      const cachedData = cache.get<unknown>(cacheKey);

      if (cachedData) {
        return cachedData;
      }

      const result = await originalMethod.apply(this, args);
      cache.set(cacheKey, result, expiresIn);
      return result;
    };

    return descriptor;
  };
} 