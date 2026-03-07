import { createComponent, styleSet, tree, when } from "nine";
import logo from "@asset/logo.svg";
import { injectedState, mainShowing } from "src/state/window";

export default createComponent(
    {
        styles: [
            styleSet(".ball")
                .width("50px")
                .height("50px")
                .borderRadius("50%")
                .display("flex")
                .alignItems("center")
                .justifyContent("center")
                .backgroundColor("rgba(255, 207, 174, 1)")
                .border("2px solid transparent")
                .transition("all .2s ease-out"),
            styleSet(".ball:hover")
                .transform("rotate(180deg)")
                .borderColor("orange"),
            styleSet(".ball-disabled")
                .width("50px")
                .height("50px")
                .borderRadius("50%")
                .display("flex")
                .alignItems("center")
                .justifyContent("center")
                .backgroundColor("rgba(200, 200, 200, 0.6)")
                .border("2px solid transparent")
                .cursor("not-allowed")
                .opacity("1"),
            styleSet(".logo").width("30px").height("30px"),
            styleSet(".logo-disabled")
                .width("30px")
                .height("30px")
                .filter("grayscale(1)"),
        ],
        uuid: "Triangle",
    },
    () => {
        return tree("div").append(
            when(
                () => !mainShowing.get() && injectedState.get(),
                () =>
                    tree("div")
                        .on("click", () => mainShowing.set(true))
                        .class("ball")
                        .append(tree("img").class("logo").src(logo)),
                [mainShowing, injectedState],
            ),
            when(
                () => !mainShowing.get() && !injectedState.get(),
                () =>
                    tree("div")
                        .class("ball-disabled")
                        .data({ region: "true" })
                        .append(tree("img").class("logo-disabled").src(logo)),
                [mainShowing, injectedState],
            ),
        );
    },
);
