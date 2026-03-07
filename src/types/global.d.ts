import { VVenveContext } from "src/api/context";

declare global {
    interface Window {
        __VVENVE__: VVenveContext;
        injectVVenve: () => void;
    }
}
export { };
