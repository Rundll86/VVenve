import { createComponent, styleSet, sync, tree } from "nine";
import SubWindow from "../SubWindow";
import VariableTarget from "../target/VariableTarget";
import { wrappedVM } from "src/state/vm";

export default createComponent({
    styles: [
        styleSet(".vars")
            .display("flex")
            .flexDirection("column")
    ],
    props: {
        x: {
            transform: Number,
            uploadable: true
        },
        y: {
            transform: Number,
            uploadable: true
        },
        showing: {
            transform: Boolean,
            uploadable: true
        },
        name: {
            transform: String
        },
        layer: {
            transform: Number
        }
    }
}, (props) => {
    return SubWindow(props, {
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
                                    wrappedVM.get().metadatas.map(
                                        m => m.watching
                                            ? VariableTarget({
                                                data: wrappedVM.get().findVariable(m.reference.target, m.reference.name),
                                                watching: true
                                            })
                                            : null
                                    ),
                                [wrappedVM]
                            )
                        )
                )
    });
});