import { injectedState } from "src/state/window";
import { VariableMetadata } from "./vm";
import { onObtainVM, wrappedVM } from "src/state/vm";
import { getAllWindows } from "src/components/manager/WindowManager";

export interface PrivateContext {
    vm: VM;
    injected: boolean;
    ban(): string;
    unban(key: string): boolean;
}
export interface PublicContext {
    variables: VariableMetadata[];
    updateVariable(): void;
}

export function createPrivateContext(vm: VM) {
    let banKey: string | null = null;
    let sealed = false;

    const handler: ProxyHandler<PrivateContext> = {
        set(
            target: PrivateContext,
            p: keyof PrivateContext,
            value: PrivateContext[keyof PrivateContext],
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
        getAllWindows().forEach(w => w.showing.set(false));
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
    onObtainVM.subcribe(vm => context.vm = vm);

    const context: PrivateContext = { vm, injected: true, ban, unban };
    return context;
}
export function createPublicContext(): PublicContext {
    return {
        variables: [],
        updateVariable() {
            wrappedVM.get().metadatas = window.__VVENVE_PUBLIC__.variables;
        },
    };
}