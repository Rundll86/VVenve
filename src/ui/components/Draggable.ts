import { createComponent } from "../component";
import { compute, reference } from "../reactive";
import { styleSet } from "../style";
import { tree } from "../tree";

export default createComponent((_, slot) => {
    const x = reference(0);
    const y = reference(0);
    let mouseOffsetX = 0;
    let mouseOffsetY = 0;
    const dragging = reference(false);
    window.addEventListener("mouseup", () => dragging.set(false));
    window.addEventListener("mousemove", (e) => {
        if (dragging.get()) {
            x.set(e.clientX - mouseOffsetX);
            y.set(e.clientY - mouseOffsetY);
            console.log(x.get(), y.get());
        }
    });
    return tree("div")
        .use(compute(
            () =>
                styleSet()
                    .left(`${x.get()}px`)
                    .top(`${y.get()}px`),
            [x, y]))
        .append(slot())
        .on("mousedown", (e) => {
            mouseOffsetX = e.offsetX;
            mouseOffsetY = e.offsetY;
            dragging.set(true);
        });
});