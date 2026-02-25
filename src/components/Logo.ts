import { createComponent, tree, styleSet } from "nine";
import Draggable from "./Draggable";
import logo from "@asset/logo.svg";

export default createComponent(
    () =>
        Draggable(undefined,
            () => tree("img")
                .src(logo)
                .use(
                    styleSet()
                        .width("50px")
                )
        )
);
