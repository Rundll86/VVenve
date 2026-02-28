import { createComponent, tree } from "nine";

export default createComponent({
    props: {
        value: {
            transform: String,
            uploadable: true
        }
    }
}, ({ value }) =>
    tree("input")
        .value(value)
        .type("text")
        .on("input", (e) => {
            if (!(e.target instanceof HTMLInputElement)) return;
            value.set(e.target.value);
        })
);