import { EventSubcriber } from "src/channel/event-subcriber";

export interface Reference<T> {
    get(): T;
    set(newData: T): void;
    event: EventSubcriber<T>;
    [key: symbol]: true;
}
export function reference<T>(initialData: T): Reference<T> {
    const event = new EventSubcriber<T>();
    let currentData = initialData;
    return {
        get() { return initialData; },
        set(newData) {
            currentData = newData;
            event.emit(currentData);
        },
        event,
        [referenceSymbol]: true
    };
}
export function compute<T, R>(render: () => R, dependencies: Reference<T>[]): Reference<R> {
    const update = () => internalRef.set(render());
    const internalRef = reference(render());
    for (const dependency of dependencies) {
        dependency.event.subcribe(update);
    }
    return internalRef;
}
export function isReference<T>(data: unknown): data is Reference<T> {
    return Object.hasOwn(data, referenceSymbol) && data[referenceSymbol] === true;
}
export const referenceSymbol = Symbol("referenced");
