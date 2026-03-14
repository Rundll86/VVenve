import { createComponent, styleSet, sync, tree, typed } from "nine";
import { WrappedVariable } from "src/api/vm";
import { wrappedVM } from "src/state/vm";

export default createComponent(
    {
        props: {
            data: {
                transform: typed<WrappedVariable>()
            }
        },
        styles: [
            styleSet(".txt")
                .width("30vw")
                .minHeight("16px")
                .maxHeight("30vh")
                .overflowY("auto")
                .padding("5px")
                .borderRadius("5px")
                .border("2px solid gray")
                .wordBreak("break-all")
                .outline("none"),
            styleSet(".txt:disabled").opacity("0.7").cursor("not-allowed"),
        ],
    },
    ({ data }) => {
        return (
            tree("button")
                .class("txt")
                .append(sync(() => String(data.get().value.get()), [data.get().value]))
                .on("click", () => {
                    const newValue = prompt();
                    if (newValue === null) return;
                    wrappedVM.get().findVariable(data.get().target, data.get().name)?.value.set(newValue);
                })
        );
    },
);
