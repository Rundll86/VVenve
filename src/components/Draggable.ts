import { createComponent, wrap, tree, sync, styleSet, defineSlot, defineTemplate } from "nine";

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
        }
    },
    slots: [
        defineSlot("content", { template: defineTemplate() })
    ],
    styles: [
        styleSet(".dragger")
            .userSelect("none")
            .zIndex("9999")
            .position("fixed"),
        styleSet(".dragger [data-region]:hover")
            .cursor("move")
    ]
}, ({ x, y }, slots) => {
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
    return tree("div")
        .class("dragger")
        .use(
            sync(() =>
                styleSet()
                    .left(`${x.get()}px`)
                    .top(`${y.get()}px`)
                , [x, y])
        )
        .append(
            tree("div")
                .append(slots.content())
        )
        .on("mousedown", (e) => {
            e.preventDefault();
            if (e.target instanceof HTMLElement && e.target.matches("[data-region],[data-region] *")) {
                mouseOffsetX = e.offsetX;
                mouseOffsetY = e.offsetY;
                dragging.set(true);
            }
        });
});