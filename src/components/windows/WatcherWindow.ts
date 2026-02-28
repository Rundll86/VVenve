import { createComponent, sync, tree, wrap } from "nine";
import SubWindow from "../SubWindow";
import { watchingVariables } from "src/state/watch";

export default createComponent({}, () => {
    return SubWindow({ x: wrap(100), y: wrap(100), title: "变量视奸器", hidding: wrap(false) }, {
        title: (title) => title,
        content: () =>
            tree("div")
                .append(
                    "视奸中：",
                    sync(() => watchingVariables.get().map(v => v.name), [watchingVariables])
                )
    });
});