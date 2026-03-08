import { VVenveContext } from "src/api/context";
import { ObtainVMMethod } from "scratch-obtain";

declare global {
    interface Window {
        __VVENVE__: VVenveContext;
        injectVVenve: () => void;
    }
    const OBTAINER: ObtainVMMethod;
}
export { };
