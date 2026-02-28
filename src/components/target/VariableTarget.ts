import { createComponent, styleSet, tree, typed } from "nine";
import Label from "../Label";
import { WrappedVariable } from "src/state/vm";
import Button from "../Button";
import { watchingVariables } from "src/state/watch";

export default createComponent({
    props: {
        data: {
            transform: typed<WrappedVariable>(),
            required: true
        }
    },
    styles: [
        styleSet(".vars")
            .margin("5px 0")
            .marginLeft("10px")
            .alignItems("center")
            .display("flex"),
        styleSet(".indent")
            .width("10px")
            .height("2px")
            .backgroundColor("gray"),
        styleSet(".text")
            .textWrap("nowrap")
            .textWrapMode("nowrap"),
        styleSet(".right")
            .marginLeft("auto")
    ]
}, ({ data }) => {
    return tree("div")
        .class("vars")
        .append(
            tree("span").class("indent"),
            Label({ text: data.get().isList ? "列表" : "变量" }),
            tree("span").class("text").append(data.get().name),
            Button({ text: "👁️" }).$.on("click", () => watchingVariables.get().push(data.get()))
        );
});