export function isNativeProxy(cons: unknown): cons is typeof Proxy {
    if (typeof cons !== "function") return false;
    const str = cons.toString();
    if (!/\[native code\]/.test(str)) return false;
    if (typeof cons.toString !== "function") return false;
    const strDesc = Object.getOwnPropertyDescriptor(cons, "toString");
    if (strDesc && !strDesc.configurable) return false;
    //@ts-expect-error 这个只是测试是否被劫持而已
    cons.length = 114514;
    if (cons.name !== "Proxy" || cons.length !== 2) return false;
    if (Object.getPrototypeOf(cons) !== Function.prototype) return false;
    const keys = Object.getOwnPropertyNames(cons);
    if (keys.filter(k => !["length", "name", "prototype"].includes(k)).length > 0) {
        return false;
    }
    return true;
}
