import { createComponent, styleSet, tree } from "nine";

export default createComponent({
    props: {
        text: {
            transform: String
        }
    },
    styles: [
        styleSet(".label")
            .backgroundColor("rgba(0,0,0,0.2)")
            .borderRadius("5px")
            .padding("3px 5px")
            .margin("0 5px")
    ]
}, ({ text }) => {
    return tree("span").class("label").append(text);
});