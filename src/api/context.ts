import { injectedState, mainShowing, projectShowing, watcherShowing } from "src/state/window";

export interface VVenveContext {
    vm: VM;
    injected: boolean;
    ban(): string;
    unban(key: string): boolean;
}

export function createContext(vm: VM) {
    let banKey: string | null = null;
    let sealed = false;

    const handler: ProxyHandler<VVenveContext> = {
        set(
            target: VVenveContext,
            p: keyof VVenveContext,
            value: VVenveContext[keyof VVenveContext],
            receiver: unknown,
        ) {
            if (!injectedState.get()) return true;
            if (p === "injected") return true;
            return Reflect.set(target, p, value, receiver);
        },
        defineProperty(target, p, descriptor) {
            if (!injectedState.get()) return true;
            return Reflect.defineProperty(target, p, descriptor);
        },
        setPrototypeOf(target, proto) {
            if (!injectedState.get()) return true;
            return Reflect.setPrototypeOf(target, proto);
        },
        deleteProperty() {
            return true;
        },
    };
    const ban = () => {
        if (banKey !== null) return "";
        banKey = crypto.randomUUID();
        injectedState.set(false);
        context.injected = false;
        mainShowing.set(false);
        watcherShowing.set(false);
        projectShowing.set(false);
        if (!sealed) {
            window.__VVENVE__ = new Proxy(window.__VVENVE__, handler);
            try {
                Object.defineProperty(window, "__VVENVE__", {
                    configurable: false,
                    writable: false,
                });
            } catch (_) {
                console.error(_);
            }
            sealed = true;
        }
        return banKey;
    };
    const unban = (key: string) => {
        if (banKey === null || key !== banKey) return false;
        banKey = null;
        injectedState.set(true);
        context.injected = true;
        return true;
    };

    const context: VVenveContext = { vm, injected: true, ban, unban };
    return context;
}