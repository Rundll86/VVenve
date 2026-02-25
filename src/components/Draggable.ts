import { createComponent, wrap, tree, sync, styleSet } from "nine";

export default createComponent({}, (_, slot) => {
    const x = wrap(100);
    const y = wrap(100);
    const dragging = wrap(false);
    let mouseOffsetX = 0;
    let mouseOffsetY = 0;
    window.addEventListener("mouseup", () => dragging.set(false));
    window.addEventListener("mousemove", (e) => {
        if (dragging.get()) {
            x.set(e.clientX - mouseOffsetX);
            y.set(e.clientY - mouseOffsetY);
        }
    });
    return tree("div")
        .use(
            styleSet()
                .userSelect("none")
                .zIndex("9999")
                .position("fixed")
        )
        .use(
            sync(() =>
                styleSet()
                    .left(`${x.get()}px`)
                    .top(`${y.get()}px`)
                , [x, y])
        )
        .append(slot)
        .on("mousedown", (e) => {
            e.preventDefault();
            mouseOffsetX = e.offsetX;
            mouseOffsetY = e.offsetY;
            dragging.set(true);
        });
});