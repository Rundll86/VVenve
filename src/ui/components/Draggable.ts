import { createComponent } from "../component";
import { compute, reference } from "../reactive";
import { styleSet } from "../style";
import { tree } from "../tree";

export default createComponent((_, slot) => {
    const x = reference(100);
    const y = reference(100);
    const dragging = reference(false);
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
        .use(compute(
            () =>
                styleSet()
                    .zIndex("9999")
                    .position("fixed")
                    .left(`${x.get()}px`)
                    .top(`${y.get()}px`),
            [x, y]))
        .append(slot())
        .on("mousedown", (e) => {
            e.preventDefault();
            mouseOffsetX = e.offsetX;
            mouseOffsetY = e.offsetY;
            dragging.set(true);
        });
});