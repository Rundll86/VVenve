import { $, createComponent, styleSet, sync, tree, when, wrap } from "nine";
import SubWindow from "../SubWindow";
import Logo from "../Logo";
import { getTargets, isVMObtained } from "../../state/vm";
import vm from "$/vm";
import SpriteTarget from "../target/SpriteTarget";
import Button from "../Button";

export default createComponent({
    props: {
        hidding: {
            transform: Boolean,
            uploadable: true,
            required: true
        }
    },
    styles: [
        styleSet(".sprites")
            .display("flex")
            .flexDirection("column")
            .maxWidth("50vw")
    ]
}, ({ hidding }) => {
    return SubWindow({ x: wrap(100), y: wrap(100), hidding }, {
        title: () => Logo(),
        content: () =>
            tree("div")
                .append(
                    "已获取VM：", isVMObtained,
                    when(
                        isVMObtained,
                        () =>
                            Button({ text: "打印到控制台" }).on("click", () => console.log(vm)),
                    ),
                    when(
                        isVMObtained,
                        () =>
                            tree("div")
                                .class("sprites")
                                .append(
                                    $(sync(() => getTargets().map(t => SpriteTarget({ data: t }))))
                                )
                    )
                )
    });
});