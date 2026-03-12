import {
    createComponent,
    wrap,
    tree,
    sync,
    styleSet,
    defineSlot,
    defineTemplate,
} from "nine";
import { use } from "src/util/data";

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
            layer: {
                transform: Number,
                shadow: 0
            }
        },
        slots: [
            defineSlot("content", { template: defineTemplate() })
        ],
        events: [
            defineSlot("startDrag", { template: defineTemplate<[number, number]>() })
        ],
        styles: [
            styleSet(".dragger")
                .userSelect("none")
                .position("fixed"),
            styleSet(".dragger [data-region]:hover").cursor("move"),
        ],
        uuid: "Draggable",
    },
    ({ x, y, layer }, slots, emit) => {
        x.event.subcribe((newX) => (newX < 0 ? x.set(0) : null));
        y.event.subcribe((newY) => (newY < 0 ? y.set(0) : null));
        const dragging = wrap(false);
        let mouseOffsetX = 0;
        let mouseOffsetY = 0;
        window.addEventListener("mouseup", () => dragging.set(false));
        window.addEventListener("mousemove", (e) => {
            if (dragging.get()) {
                x.set(x.get() + e.movementX);
                y.set(y.get() + e.movementY);
            }
        });
        use(mouseOffsetX, mouseOffsetY);
        return tree("div")
            .class("dragger")
            .id("vvenve-dragger")
            .use(
                sync(
                    () => styleSet()
                        .zIndex(String(2147483647 - layer.get()))
                        .left(`${x.get()}px`)
                        .top(`${y.get()}px`),
                    [x, y, layer],
                ),
            )
            .append(tree("div").append(slots.content()))
            .on("mousedown", (e) => {
                e.preventDefault();
                if (
                    e.target instanceof HTMLElement &&
                    e.target.matches("[data-region],[data-region] *")
                ) {
                    mouseOffsetX = e.offsetX;
                    mouseOffsetY = e.offsetY;
                    dragging.set(true);
                    emit("startDrag", [x.get(), y.get()]);
                }
            });
    },
);
