import { createComponent, styleSet, tree } from "nine";

export default createComponent({
    props: {
        value: {
            transform: String,
            uploadable: true
        }
    },
    styles: [
        styleSet(".txt")
            .width("100%")
            .minHeight("20px")
            .maxHeight("60px")
            .padding("5px")
            .borderRadius("5px")
            .border("2px solid gray")
    ]
}, ({ value }) =>
    tree("textarea")
        .class("txt")
        .value(value)
        .on("input", (e) => {
            if (!(e.target instanceof HTMLInputElement)) return;
            value.set(e.target.value);
        })
);