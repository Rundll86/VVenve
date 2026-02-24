import { normalizeTree, TreeResult } from "./component";
import { isReference, Reference } from "./reactive";
import { StyleSet } from "./style";

export type TreeContext<T extends HTMLElement = HTMLElement> = {
    [K in keyof T as T[K] extends (...args: unknown[]) => unknown ? never : K]: (data: T[K] | Reference<T[K]>) => TreeContext<T>;
} & {
    element: T;
    append(...children: TreeResult[]): TreeContext<T>;
    use(styleSet: StyleSet | Reference<StyleSet>): TreeContext<T>;
    on<E extends keyof HTMLElementEventMap>(key: E, handler: (data: HTMLElementEventMap[E]) => void, options?: AddEventListenerOptions): TreeContext<T>;
};
export function tree<E extends keyof HTMLElementTagNameMap>(data: E | HTMLElement) {
    const element: HTMLElement = typeof data === "string" ? document.createElement(data) : data;
    const context: TreeContext<HTMLElementTagNameMap[E]> = new Proxy({
        element,
        append(...children: TreeResult[]) {
            for (const child of children) {
                element.appendChild(normalizeTree(child).element);
            }
            return context;
        },
        use(styleSet: StyleSet | Reference<StyleSet>) {
            const update = (rules: Record<string, string>) => {
                for (const [key, value] of Object.entries(rules)) {
                    element.style.setProperty(String(key), value);
                }
            };
            if (isReference<StyleSet>(styleSet)) {
                styleSet.event.subcribe((newData) => update(newData.rules));
                update(styleSet.get().rules);
            } else {
                update(styleSet.rules);
            }
            return context;
        },
        on(key, handler, options) {
            element.addEventListener(key, handler, options);
            return context;
        },
    } as TreeContext<HTMLElementTagNameMap[E]>, {
        get<P extends keyof HTMLElement>(target: Record<string, unknown>, p: P, receiver: unknown) {
            if (Reflect.has(target, p)) {
                return Reflect.get(target, p, receiver);
            } else {
                return (data: HTMLElementTagNameMap[E][P] | Reference<HTMLElementTagNameMap[E][P]>) => {
                    if (isReference<HTMLElementTagNameMap[E][P]>(data)) {
                        const update = (newData: HTMLElementTagNameMap[E][P]) => element[p] = newData;
                        data.event.subcribe(update);
                        update(data.get());
                    } else {
                        element[p] = data;
                    }
                    return context;
                };
            }
        },
    });
    return context;
}