import { createComponent, styleSet, sync, tree, wrap } from "nine";
import SubWindow from "../SubWindow";
import { watchings } from "src/state/watch";
import { watcherShowing } from "src/state/window";
import VariableTarget from "../target/VariableTarget";

export default createComponent({
    styles: [
        styleSet(".vars")
            .display("flex")
            .flexDirection("column")
    ]
}, () => {
    return SubWindow({ x: wrap(100), y: wrap(100), title: "变量视奸器", showing: watcherShowing }, {
        title: (title) => title,
        content: () =>
            tree("div")
                .append(
                    "视奸中：",
                    tree("div")
                        .class("vars")
                        .append(
                            sync(() =>
                                watchings.get().map(v => VariableTarget({ data: v, watching: true }))
                                , [watchings]
                            )
                        )
                )
    });
});