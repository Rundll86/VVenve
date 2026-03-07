interface __VVENVE__ {
    vm: VM;
    injected: boolean;
    ban(): string;
    unban(key: string): boolean;
}

declare global {
    interface Window {
        __VVENVE__: __VVENVE__;
        injectVVenve: () => void;
    }
}
export {};
