import { StyleSet } from "./style";

export type TreeContext<T extends HTMLElement = HTMLElement> = {
    [K in keyof T as T[K] extends (...args: unknown[]) => unknown ? never : K]: (data: T[K]) => TreeContext<T>;
} & {
    element: T;
    append(...children: (TreeContext | HTMLElement)[]): TreeContext<T>;
    use(...styleSet: StyleSet[]): TreeContext<T>;
};
export function tree<E extends keyof HTMLElementTagNameMap>(data: E) {
    const element = document.createElement(data) as HTMLElementTagNameMap[E];
    const context: TreeContext<HTMLElementTagNameMap[E]> = new Proxy({
        element,
        append(...children: (TreeContext | HTMLElement)[]) {
            for (const child of children) {
                if (child instanceof HTMLElement) {
                    element.appendChild(child);
                } else {
                    element.appendChild(child.element);
                }
            }
            return context;
        },
        use(...styleSets: StyleSet[]) {
            for (const styleSet of styleSets) {
                for (const [key, value] of Object.entries(styleSet.rules)) {
                    element.style[key as number] = value;
                }
            }
            return context;
        },
    } as TreeContext<HTMLElementTagNameMap[E]>, {
        get<P extends keyof HTMLElement>(target: Record<string, unknown>, p: P, receiver: unknown) {
            if (Reflect.has(target, p)) {
                return Reflect.get(target, p, receiver);
            } else {
                return (data: HTMLElementTagNameMap[E][P]) => {
                    element[p] = data;
                    return context;
                };
            }
        },
    });
    return context;
}