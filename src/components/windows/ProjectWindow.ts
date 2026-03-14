import { createComponent, styleSet, tree } from "nine";
import SubWindow from "../SubWindow";
import { download } from "src/util/data";
import Button from "../Button";
import { vm as _vm } from "src/state/vm";

export default createComponent({
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
}, async (props) => {
    const vm = await _vm;
    return SubWindow(props, {
        title: () => "作品管理器",
        content: () =>
            tree("div")
                .use(styleSet().display("flex").flexDirection("column").alignItems("center"))
                .append(
                    Button({ text: "下载作品到本地" }).$
                        .on("click", async () => download(await vm.saveProjectSb3() || "", "project.sb3")),
                    Button({ text: "下载舞台" }).$
                        .on("click", async () => {
                            for (const target of vm.runtime.targets ?? []) {
                                if (target.isStage) {
                                    download(await vm.exportSprite(target.id) || "", "舞台.sprite3");
                                }
                            }
                        }),
                    Button({ text: "下载所有角色" }).$
                        .on("click", async () => {
                            for (const target of vm.runtime.targets ?? []) {
                                if (target.isOriginal && !target.isStage) {
                                    download(await vm.exportSprite(target.id) || "", `${target.getName()}.sprite3`);
                                }
                            }
                        })
                )
    });
});