import { createComponent, styleSet, sync, tree, wrap } from "nine";
import SubWindow from "../SubWindow";
import { watcherShowing } from "src/state/window";
import VariableTarget from "../target/VariableTarget";
import { wrappedVM } from "src/state/vm";

export default createComponent({
    styles: [
        styleSet(".vars")
            .display("flex")
            .flexDirection("column")
    ]
}, () => {
    return SubWindow({ x: wrap(100), y: wrap(100), showing: watcherShowing }, {
        title: () => "变量视奸器",
        content: () =>
            tree("div")
                .append(
                    "视奸中：",
                    tree("div")
                        .class("vars")
                        .append(
                            sync(
                                () =>
                                    wrappedVM
                                        ? wrappedVM.get().watchings.map(v => VariableTarget({
                                            data: wrappedVM?.get().findVariable(v.target, v.name),
                                            watching: true
                                        }))
                                        : null,
                                [wrappedVM]
                            )
                        )
                )
    });
});