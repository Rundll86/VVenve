import { createComponent, styleSet, sync, tree, typed, when } from "nine";
import Label from "../Label";
import { WrappedVariable } from "src/state/vm";
import Button from "../Button";
import { watchingVariables } from "src/state/watch";

export default createComponent({
    props: {
        data: {
            transform: typed<WrappedVariable>(),
            required: true
        },
        watching: {
            transform: Boolean,
            shadow: false
        }
    },
    styles: [
        styleSet(".var")
            .margin("5px 0")
            .marginLeft("10px")
            .alignItems("center")
            .display("flex")
            .flexDirection("row"),
        styleSet(".var:hover")
            .backgroundColor("rgba(0,0,0,0.05)"),
        styleSet(".var:active")
            .backgroundColor("rgba(0,0,0,0.1)"),
        styleSet(".indent")
            .width("10px")
            .height("2px")
            .backgroundColor("gray"),
        styleSet(".text")
            .textWrap("nowrap")
            .textWrapMode("nowrap"),
        styleSet(".right")
            .marginLeft("auto")
    ],
    uuid: "VariableTarget"
}, ({ data, watching }) => {
    return tree("div")
        .class("var")
        .append(
            tree("span").class("indent"),
            Label({ text: data.get().isList ? "列表" : "变量" }),
            tree("span").class("text").append(data.get().name),
            when(
                () => !watching.get(),
                () => Button({
                    text: sync(() =>
                        watchingVariables.get().includes(data.get()) ? "🔪" : "👁️",
                        [watchingVariables])
                }).$
                    .class("right")
                    .on.stop("click", () => {
                        const watchings = watchingVariables.get();
                        if (watchings.includes(data.get())) watchingVariables.set(watchings.filter(e => e !== data.get()));
                        else watchings.push(data.get());
                    })
                , [watching]
            )
        );
});