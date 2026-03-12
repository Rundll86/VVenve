export function moveToFirst<T>(arr: T[], data: T): T[] {
    const index = arr.indexOf(data);
    if (index !== -1) {
        arr.splice(index, 1);
        arr.unshift(data);
    }
    return arr;
}