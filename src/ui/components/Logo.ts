import { createComponent } from "../component";
import { tree } from "../tree";
import logo from "../../assets/logo.svg";
import Draggable from "./Draggable";
import { styleSet } from "../style";

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
