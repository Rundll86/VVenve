import { createComponent, tree, styleSet, getAsset } from "nine";
import Draggable from "./Draggable";

export default createComponent(
    () =>
        Draggable(undefined,
            () => tree("img")
                .src(getAsset("Logo"))
                .use(
                    styleSet()
                        .width("50px")
                )
        )
);
