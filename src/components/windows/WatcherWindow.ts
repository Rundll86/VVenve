import { createComponent, tree, wrap } from "nine";
import SubWindow from "../SubWindow";

export default createComponent({}, () => {
    return SubWindow({ x: wrap(100), y: wrap(100), title: "变量监视器" }, {
        title: (title) => title,
        content: () =>
            tree("div")
    });
});