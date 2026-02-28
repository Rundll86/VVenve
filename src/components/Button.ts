import { createComponent, defineEvent, defineTemplate, styleSet, tree } from "nine";

export default createComponent({
    props: {
        text: {
            transform: String
        }
    },
    events: [
        defineEvent("click", { template: defineTemplate<null>() })
    ],
    styles: [
        styleSet(".btn")
            .backgroundColor("rgba(0,0,0,0.1)")
            .padding("3px 5px")
            .margin("5px")
            .borderRadius("5px"),
        styleSet(".btn:hover")
            .backgroundColor("rgba(0,0,0,0.2)"),
        styleSet(".btn:active")
            .backgroundColor("rgba(0,0,0,0.3)")
    ],
    uuid: "VVenveButton"
}, ({ text }) =>
    tree("button")
        .class("btn")
        .append(text)
);