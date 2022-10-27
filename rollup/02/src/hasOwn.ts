const hasOwn = (obj: Record<string, any>, key: string) => Reflect.has(obj, key);

export { hasOwn };
