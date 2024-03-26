export const isObj = (v: unknown): v is Record<string, unknown> => {
    return typeof v === 'object' && v !== null;
}

export const hasProp = <K extends PropertyKey>(data: object, prop: K): data is Record<K, unknown> => {
    return prop in data;
}