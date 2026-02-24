import { TreeContext } from "./tree";

export interface Component<T> {
    (props: T): Node | null;
}
export function createComponent<T>(render: (options: T) => HTMLElement | TreeContext | string | number | null): Component<T> {
    return (options) => {
        const result = render(options);
        if (result instanceof HTMLElement) {
            return result;
        } else if (typeof result === "string" || typeof result === "number") {
            return document.createTextNode(String(result));
        } else {
            return result?.element ?? null;
        }
    };
}