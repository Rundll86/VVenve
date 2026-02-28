import { createComponent, wrap } from "nine";
import SubWindow from "../SubWindow";
import Logo from "../Logo";

export default createComponent({}, () => {
    const x = wrap(100);
    const y = wrap(100);
    return SubWindow({ x, y, title: "Venve" }, {
        title: () => Logo()
    });
});