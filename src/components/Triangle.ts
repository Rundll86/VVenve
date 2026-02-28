import { createComponent, styleSet, tree, when } from "nine";
import logo from "@asset/logo.svg";

export default createComponent({
    styles: [
        styleSet(".ball")
            .width("50px")
            .height("50px")
            .borderRadius("50%")
            .display("flex")
            .alignItems("center")
            .justifyContent("center")
            .backgroundColor("rgb(176, 255, 221)")
            .border("2px solid transparent")
            .transition("all .2s ease-out"),
        styleSet(".ball:hover")
            .transform("rotate(180deg)")
            .borderColor("orange"),
        styleSet(".logo")
            .width("40px")
            .height("40px")
    ],
    props: {
        showing: {
            transform: Boolean,
            required: true,
            uploadable: true
        }
    }
}, ({ showing }) => {
    return tree("div").append(
        when(showing, () =>
            tree("div")
                .on("click", () => showing.set(false))
                .class("ball")
                .append(tree("img").class("logo").src(logo))
        )
    );
});