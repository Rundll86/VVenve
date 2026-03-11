import { PrivateContext, PublicContext } from "src/api/context";
import { ObtainVMMethod } from "scratch-obtain";

declare global {
    interface Window {
        __VVENVE__: PrivateContext;
        __VVENVE_PUBLIC__: PublicContext;
        injectVVenve: () => void;
    }
    const OBTAINER: ObtainVMMethod;
    const IS_DEVELOPMENT: boolean;
}
export { };
