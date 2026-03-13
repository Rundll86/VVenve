import {
    createComponent,
    styleSet,
    sync,
    tree,
    typed,
    when,
} from "nine";
import Label from "../Label";
import ValueShow from "../ValueShow";
import { WrappedVariable } from "src/api/vm";
import { wrappedVM } from "src/state/vm";
import { choice } from "src/util/random";
import airTips from "src/constants/airTips";
import watcherEmojis from "src/constants/watcherEmojis";

export default createComponent(
    {
        props: {
            data: {
                transform: typed<WrappedVariable>(),
            },
            watching: {
                transform: Boolean,
            },
            isAir: {
                transform: Boolean,
            },
        },
        styles: [
            styleSet(".var")
                .padding("5px")
                .margin("5px 0")
                .marginLeft("10px")
                .alignItems("center")
                .borderRadius("5px")
                .display("flex")
                .flexDirection("row"),
            styleSet(".var:hover").backgroundColor("rgba(0,0,0,0.05)"),
            styleSet(".var:active").backgroundColor("rgba(0,0,0,0.1)"),
            styleSet(".indent").width("10px").height("2px").backgroundColor("gray"),
            styleSet(".text").textWrap("nowrap").textWrapMode("nowrap"),
            styleSet(".right").marginLeft("auto"),
            styleSet(".var-watcher").display("flex").flexDirection("column"),
            styleSet(".watcher"),
            styleSet(".info")
                .display("flex")
                .flexDirection("column"),
            styleSet(".name"),
            styleSet(".description")
                .fontSize("14px")
                .color("gray")
        ],
        uuid: "VariableTarget",
    },
    ({ data, watching, isAir }) => {
        return tree("div")
            .class("var-watcher")
            .append(
                tree("div")
                    .class("var")
                    .on.stop("click", () => {
                        if (isAir.get()) {
                            const tip = `${choice(watcherEmojis)}${choice(airTips)}${choice(watcherEmojis)}`;
                            console.error(tip);
                            alert(tip);
                            return;
                        }
                        if (watching.get()) {
                            wrappedVM.get().toggleMetadata(data.get().target, data.get().name, "locked");
                        } else {
                            wrappedVM.get().toggleMetadata(data.get().target, data.get().name, "watching");
                        }
                    })
                    .append(
                        tree("span").class("indent"),
                        Label({
                            text: isAir.get()
                                ? "？？？"
                                : data.get()?.isList
                                    ? "列表"
                                    : "变量",
                        }),
                        when(watching, () => Label({ text: data.get()?.target })),
                        tree("span")
                            .class("info")
                            .append(
                                tree("span")
                                    .class("name")
                                    .append(
                                        sync(
                                            () =>
                                                (wrappedVM.get().getMetadata(data.get()?.target, data.get()?.name, "locked") ? "🔒" : "")
                                                + (isAir.get() ? "棍母" : data.get()?.name),
                                            [data, wrappedVM],
                                        )
                                    ),
                                tree("span")
                                    .class("description")
                                    .append(
                                        sync(
                                            () => wrappedVM.get().getMetadata(data.get()?.target, data.get()?.name, "description"),
                                            [data, wrappedVM],
                                        )
                                    ),
                            ),
                        when(
                            () => !watching.get(),
                            () =>
                                tree("span")
                                    .class("right")
                                    .append(
                                        sync(
                                            () =>
                                                isAir.get() ? "🚫👁️" :
                                                    wrappedVM.get().getMetadata(data.get()?.target, data.get()?.name, "watching")
                                                        ? "🔪"
                                                        : "👁️",
                                            [wrappedVM, data],
                                        ),
                                    ),
                            [watching],
                        ),
                    ),
                when(watching, () => {
                    return tree("div")
                        .class("watcher")
                        .append(
                            ValueShow({ data }),
                        );
                }),
            );
    },
);
