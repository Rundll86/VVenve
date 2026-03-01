declare global {
    interface Window {
        __VVENVE__: VM;
        injectVVenve: () => void;
    }
}
export { };