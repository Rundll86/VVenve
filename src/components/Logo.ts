import { createComponent, tree, styleSet, assets } from "nine";
import Draggable from "./Draggable";

export default createComponent(
    () =>
        Draggable(undefined,
            () => tree("img")
                .src(assets.Logo)
                .use(
                    styleSet()
                        .width("50px")
                )
        )
);
