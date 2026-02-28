import { createComponent, styleSet, tree } from "nine";
import logo from "@asset/logo.svg";
import title from "@asset/title.svg";

export default createComponent({
    styles: [
        styleSet(".logo")
            .height("15px"),
        styleSet(".wrapper")
            .display("flex")
            .alignItems("center")
            .padding("5px"),
        styleSet(".line")
            .width("2px")
            .height("15px")
            .backgroundColor("orange")
            .margin("0 2px")
    ]
}, () =>
    tree("div")
        .class("wrapper")
        .append(
            tree("img").class("logo").src(logo),
            tree("div").class("line"),
            tree("img").class("logo").src(title)
        )
);