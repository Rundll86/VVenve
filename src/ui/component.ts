import { Empty } from "src/util/types";
import { TreeContext, tree } from "./tree";

export type RenderResult = {
    mount(to: string | HTMLElement): void;
    $: TreeContext;
};
export type TreeResult = HTMLElement | TreeContext | string | number | Empty;
export interface Component<T> {
    (props: T): RenderResult;
}
export function createComponent<T = void>(renderer: (options: T) => TreeResult): Component<T> {
    return (options: T) => {
        const nodeTree = renderer(options);
        let result: TreeContext;
        if (nodeTree instanceof HTMLElement) {
            result = tree(nodeTree);
        } else if (typeof nodeTree === "string" || typeof nodeTree === "number") {
            result = tree("span").textContent(String(nodeTree));
        } else {
            result = nodeTree ?? tree("div");
        }
        return {
            mount(to: string | HTMLElement) {
                const targets = typeof to === "string" ? [...document.querySelectorAll<HTMLElement>(to)] : [to];
                for (const target of targets) {
                    target.appendChild(result.element);
                }
            },
            $: result
        };
    };
}