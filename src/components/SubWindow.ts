import {
    createComponent,
    defineSlot,
    defineTemplate,
    styleSet,
    tree,
    when,
} from "nine";
import Draggable from "./Draggable";
import Button from "./Button";
import Logo from "./Logo";
import { pin } from "./manager/WindowManager";

export default createComponent(
    {
        props: {
            x: {
                transform: Number,
                validate: Number.isInteger,
                required: true,
                uploadable: true,
            },
            y: {
                transform: Number,
                validate: Number.isInteger,
                required: true,
                uploadable: true,
            },
            showing: {
                transform: Boolean,
                uploadable: true,
                required: true,
            },
            name: {
                transform: String
            },
            layer: {
                transform: Number,
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
            styleSet(".window:has(.title-bar:hover)").borderColor("orange"),
            styleSet(".title-bar")
                .backgroundColor("rgba(0,0,0,0.1)")
                .display("flex")
                .alignItems("center")
                .padding("5px"),
            styleSet(".title-bar:hover").backgroundColor("orange"),
            styleSet(".content")
                .padding("20px")
                .maxHeight("80vh")
                .overflow("auto"),
            styleSet(".right").marginLeft("auto"),
        ],
        slots: [
            defineSlot("title", { template: defineTemplate<string>() }),
            defineSlot("content", { template: defineTemplate() }),
        ],
        uuid: "SubWindow",
    },
    ({ x, y, showing, name, layer }, slots) => {
        return Draggable(
            { x, y, layer },
            {
                content: () =>
                    tree("div").append(
                        when(showing, () =>
                            tree("div")
                                .class("window")
                                .id("vvenv-window")
                                .append(
                                    tree("div")
                                        .class("title-bar")
                                        .append(
                                            Logo(
                                                {},
                                                {
                                                    title: (title) =>
                                                        slots.title(title),
                                                },
                                            ),
                                            tree("span").class("right"),
                                            Button({ text: "🔴" }).$.on(
                                                "click",
                                                e => {
                                                    e.stopPropagation();
                                                    showing.set(false);
                                                },
                                            ),
                                        )
                                        .data({ region: "true" }),
                                    tree("div")
                                        .class("content")
                                        .append(slots.content()),
                                ),
                        ),
                    ),
            },
        ).$.on("mousedown", () => pin(name.get()));
    },
);
