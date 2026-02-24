import { EventSubcriber } from "src/channel/event-subcriber";

export const referenceSymbol = Symbol("referenced");
export type Reference<T> = {
    get(): T;
    set(newData: T): void;
    event: EventSubcriber<[T, T]>;
} & { [K in typeof referenceSymbol]: true; };
export function reference<T>(initialData: T): Reference<T> {
    const event = new EventSubcriber<[T, T]>();
    let currentData = initialData;
    return {
        get() { return currentData; },
        set(newData) {
            if (currentData !== newData) {
                const oldData = currentData;
                currentData = newData;
                event.emit(newData, oldData);
            }
        },
        event,
        [referenceSymbol]: true
    };
}
export function compute<T, R>(render: () => R, dependencies: Reference<T>[]): Reference<R> {
    const internalRef = reference(render());
    const update = () => {
        const newData = render();
        const currentData = internalRef.get();
        const hasChanged = currentData !== newData;
        if (hasChanged) {
            internalRef.set(newData);
        }
    };
    for (const dependency of dependencies) {
        dependency.event.subcribe(update);
    }
    return internalRef;
}
export function isReference<T>(data: unknown): data is Reference<T> {
    return Object.hasOwn(data, referenceSymbol) && data[referenceSymbol] === true;
}
