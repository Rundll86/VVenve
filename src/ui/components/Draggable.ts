import { createComponent } from "../component";
import { compute, reference } from "../reactive";
import { styleSet } from "../style";
import { tree } from "../tree";

export default createComponent((_, slot) => {
    let x = reference(0);
    let y = reference(0);
    let mouseOffsetX = 0;
    let mouseOffsetY = 0;
    let dragging = false;
    window.addEventListener("mouseup", () => dragging = false);
    window.addEventListener("mousemove", (e) => {
        if (dragging) {
            x.set(e.clientX - mouseOffsetX);
            y.set(e.clientY - mouseOffsetY);
        }
    });
    return tree("div")
        .use(compute(
            () =>
                styleSet()
                    .left(`${x.get()}px`)
                    .top(`${y.get()}px`),
            [x, y]
        ))
        .append(slot())
        .on("mousedown", (e) => {
            mouseOffsetX = e.offsetX;
            mouseOffsetY = e.offsetY;
            dragging = true;
        });
});