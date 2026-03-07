interface __VVENVE__ {
    vm: VM;
    injected: boolean;
    ban(): void;
}

declare global {
    interface Window {
        __VVENVE__: __VVENVE__;
        injectVVenve: () => void;
    }
}
export {};
