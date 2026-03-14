import {
    $,
    createComponent,
    styleSet,
    sync,
    tree,
    when,
    wrap,
    Wrapper,
} from "nine";
import SubWindow from "../SubWindow";
import { isVMObtained, vm, wrappedVM } from "../../state/vm";
import Button from "../Button";
import SpriteTarget from "../target/SpriteTarget";
import { setShowing } from "../manager/WindowManager";

export default createComponent(
    {
        styles: [
            styleSet(".sprites")
                .display("flex")
                .flexDirection("column")
                .maxWidth("50vw"),
        ],
        props: {
            x: {
                transform: Number,
                uploadable: true
            },
            y: {
                transform: Number,
                uploadable: true
            },
            showing: {
                transform: Boolean,
                uploadable: true
            },
            name: {
                transform: String
            },
            layer: {
                transform: Number
            }
        }
    },
    (props) => {
        const targetShowing: Record<string, Wrapper<boolean>> = {};

        return SubWindow(
            props,
            {
                title: (title) => tree("img").class("logo").src(title),
                content: () =>
                    tree("div").append(
                        "已获取VM：",
                        isVMObtained,
                        when(isVMObtained, () =>
                            Button({ text: "打印到控制台" }).$.on("click", async () => IS_DEVELOPMENT && console.log(await vm)),
                        ),
                        when(isVMObtained, () =>
                            tree("div")
                                .class("sprites")
                                .append(
                                    Button({ text: "项目管理器" }).$.on(
                                        "click",
                                        () => setShowing("project", true),
                                    ),
                                    Button({ text: "视奸变量" }).$.on(
                                        "click",
                                        () => setShowing("watcher", true),
                                    ),
                                    $(
                                        sync(
                                            () =>
                                                wrappedVM!
                                                    .get()
                                                    .targets.map((t) => {
                                                        if (
                                                            !targetShowing[
                                                                t.name
                                                            ]
                                                        )
                                                            targetShowing[
                                                                t.name
                                                            ] = wrap(false);
                                                        return SpriteTarget({
                                                            data: t,
                                                            showing:
                                                                targetShowing[
                                                                    t.name
                                                                ],
                                                        });
                                                    }),
                                            [wrappedVM],
                                        ),
                                    ),
                                ),
                        ),
                    ),
            },
        );
    },
);
