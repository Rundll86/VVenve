import { createComponent, styleSet, tree } from "nine";
import Draggable from "./Draggable";
import logo from "@asset/logo.svg";

export default createComponent({}, () => {
    return Draggable({},
        tree("div")
            .use(
                styleSet()
                    .width("60px")
                    .height("60px")
                    .display("flex")
                    .alignItems("center")
                    .justifyContent("center")
                    .backgroundColor("blue")
                    .borderRadius("50%")
                    .padding("10px")
            )
            .append(
                tree("img")
                    .src(logo)
                    .use(
                        styleSet()
                            .width("50px")
                            .height("50px")
                    )
            )
    );
});