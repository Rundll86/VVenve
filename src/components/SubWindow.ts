import { createComponent, defineSlot, defineTemplate, styleSet, tree } from "nine";
import Draggable from "./Draggable";
import Logo from "./Logo";

export default createComponent({
    props: {
        x: {
            transform: Number,
            validate: Number.isInteger,
            required: true,
            uploadable: true
        },
        y: {
            transform: Number,
            validate: Number.isInteger,
            required: true,
            uploadable: true
        },
        title: {
            transform: String
        }
    },
    styles: [
        styleSet(".window")
            .border("2px solid gray")
            .backgroundColor("white")
            .display("flex")
            .flexDirection("column")
            .borderRadius("10px"),
        styleSet(".window:has(.title-bar:hover)")
            .borderColor("orange"),
        styleSet(".title-bar")
            .backgroundColor("rgba(0,0,0,0.1)")
            .padding("5px"),
        styleSet(".content")
            .padding("20px")
    ],
    slots: [
        defineSlot("title", { template: defineTemplate<string>() }),
        defineSlot("content", { template: defineTemplate() })
    ]
}, ({ x, y, title }, slots) => {
    return Draggable({ x, y }, {
        content: () =>
            tree("div")
                .class("window")
                .append(
                    tree("div")
                        .class("title-bar")
                        .append(slots.title(title))
                        .data({ region: "true" }),
                    tree("div")
                        .class("content")
                        .append(slots.content())
                )
    });
});