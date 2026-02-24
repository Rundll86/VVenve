import { createComponent } from "../component";
import { tree } from "../tree";
import logo from "../../assets/logo.svg";
import { styleSet } from "../style";
import Draggable from "./Draggable";

export default createComponent(
    () =>
        Draggable(undefined,
            () => tree("img")
                .src(logo)
                .use(
                    styleSet()
                        .position("fixed")
                        .right("20px")
                        .bottom("20px")
                        .width("50px")
                        .height("50px")
                )
        )
);
