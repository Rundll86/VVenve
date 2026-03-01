import { createComponent, defineSlot, defineTemplate, styleSet, tree, when } from "nine";
import Draggable from "./Draggable";
import Button from "./Button";
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
        showing: {
            transform: Boolean,
            uploadable: true,
            required: true
        }
    },
    styles: [
        styleSet(".window")
            .border("2px solid gray")
            .backgroundColor("white")
            .display("flex")
            .flexDirection("column")
            .overflow("hidden")
            .borderRadius("10px"),
        styleSet(".window:has(.title-bar:hover)")
            .borderColor("orange"),
        styleSet(".title-bar")
            .backgroundColor("rgba(0,0,0,0.1)")
            .display("flex")
            .alignItems("center")
            .padding("5px"),
        styleSet(".title-bar:hover")
            .backgroundColor("orange"),
        styleSet(".content")
            .padding("20px")
            .maxHeight("80vh")
            .overflow("auto"),
        styleSet(".close-button")
            .marginLeft("auto")
    ],
    slots: [
        defineSlot("title", { template: defineTemplate<string>() }),
        defineSlot("content", { template: defineTemplate() })
    ],
    uuid: "SubWindow"
}, ({ x, y, showing }, slots) => {
    return Draggable({ x, y }, {
        content: () =>
            tree("div").append(
                when(showing,
                    () => tree("div")
                        .class("window")
                        .append(
                            tree("div")
                                .class("title-bar")
                                .append(
                                    Logo({}, { title: title => slots.title(title) }),
                                    Button({ text: "🔴" }).$
                                        .on("click", () => showing.set(false))
                                )
                                .data({ region: "true" }),
                            tree("div")
                                .class("content")
                                .append(slots.content())
                        ))
            )
    });
});