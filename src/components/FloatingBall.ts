import { createComponent, styleSet, tree } from "nine";

export default createComponent({
    styles: [
        styleSet(".ball")
            .width("50px")
            .height("50px")
            .display("flex")
            .alignItems("start")
            .justifyContent("center")
            .backgroundColor("rgb(176, 255, 221)")
            .padding("10px")
            .transition("all .2s ease-out")
            .clipPath("polygon(0 10%,100% 10%,50% 100%)"),
        styleSet(".ball:hover")
            .transform("rotate(180deg)")
    ]
}, () => {
    return tree("div")
        .className("ball")
        .append(
            tree("span")
                .textContent("▲")
                .use(
                    styleSet()
                        .color("orange")
                        .fontSize("30px")
                )
        );
});