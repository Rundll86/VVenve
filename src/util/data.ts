export function use<T extends unknown[]>(...data: T): T {
    return data;
}