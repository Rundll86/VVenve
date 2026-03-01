import { EventSubcriber, structWatchers, } from "nine";

export function patchArray<O extends object, K extends keyof O, T = O[K]>(obj: O, key: K) {
    const updatedEvent = new EventSubcriber<[T]>();
    const hooks = {
        set: new EventSubcriber<[T]>({ bubbleable: true }, updatedEvent),
        modified: new EventSubcriber<[T]>({ bubbleable: true }, updatedEvent),
        deleted: new EventSubcriber<[T]>({ bubbleable: true }, updatedEvent),
        updated: updatedEvent
    };
    const state = { patching: false };
    const doPatch = () => {
        state.patching = true;
        patchedObj[key] = new Proxy(patchedObj[key] as unknown[] & T, {
            get(target, p, receiver) {
                const orig = Reflect.get(target, p, receiver);
                if (typeof orig === "function" && structWatchers.array.arrayModifiableActions.includes(orig.name)) {
                    return (...args: unknown[]) => {
                        const result = orig.call(target, ...args);
                        hooks.modified.emit(target);
                        return result;
                    };
                } else {
                    return orig;
                }
            },
        }) as O[K];
        state.patching = false;
    };
    let currentValue = obj[key];
    const patchedObj = Object.defineProperty(obj, key, {
        set(newValue) {
            currentValue = newValue;
            if (!state.patching) {
                hooks.set.emit(newValue);
                doPatch();
            }
        },
        get() {
            return currentValue;
        },
        configurable: true
    });
    doPatch();
    return { hooks, patched: patchedObj };
}