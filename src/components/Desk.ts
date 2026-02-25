import { createComponent, styleSet, sync, tree, TreeResult, when, wrap } from "nine";

export default createComponent(() => {
    const list1 = wrap<string[]>([]);
    const list2 = wrap<string[]>([]);
    const state = wrap(false);
    return tree("div")
        .use(
            styleSet()
                .backgroundColor("red")
                .color("white")
                .display("flex")
                .flexDirection("column")
        )
        .append(
            "列表1如下：",
            sync<TreeResult[]>(() => list1.get().map(e => tree("span").textContent(e)), [list1]),
            "列表2如下：",
            sync<TreeResult[]>(() => list2.get().map(e => tree("span").textContent(e)), [list2]),
            "结束！",
            tree("button").textContent("列表1增加").on("click", () => list1.get().push(String(Math.random()))),
            tree("button").textContent("列表2增加").on("click", () => list2.get().push(String(Math.random()))),
            tree("button").textContent("切换状态").on("click", () => state.set(!state.get())),
            when(() => state.get(), "我显示了！", [state])
        );
});