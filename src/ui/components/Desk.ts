import { createComponent, TreeResult } from "../component";
import { sync, wrap } from "../reactive";
import { tree } from "../tree";

export default createComponent(() => {
    const list1 = wrap<string[]>([]);
    const list2 = wrap<string[]>([]);
    return tree("div")
        .append(
            "列表1如下：",
            sync<TreeResult[]>(() => list1.get(), [list1]),
            "列表2如下：",
            sync<TreeResult[]>(() => list2.get(), [list1]),
            "结束！",
            tree("button").textContent("列表1增加").on("click", () => {
                list1.get().push(String(Math.random()));
            }),
            tree("button").textContent("列表2增加").on("click", () => {
                list2.get().push(String(Math.random()));
            })
        );
});