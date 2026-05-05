import { createPrivateContext, createPublicContext } from "./api/context";
import Draggable from "./components/Draggable";
import WindowManager from "./components/manager/WindowManager";
import Triangle from "./components/Triangle";
import { $, createComponent, sync, tree, wrap } from "./nine";
import { onObtainVM, vm, wrappedVM } from "./state/vm";
import { guardWindows } from "./state/window";
import { isNativeProxy } from "./util/validate";

// onObtainVM.subcribe(async () => {
//     if (!isNativeProxy(window.Proxy)) {
//         console.error("疑似注入");
//         alert("妈呀大姐 吓死人了🙄💅，你个臭贝贝是不是改惹Proxy构造器想绕过本🉑的私有鉴权接口，被本🉑发现惹🥵这么会hijack可以去仓库提个PR哈🥵🍆。");
//         return;
//     }
//     if (IS_DEVELOPMENT) {
//         console.log("VM:", wrappedVM);
//     }

//     document.querySelectorAll("#vvenve-dragger").forEach(e => e.remove());
//     Reflect.deleteProperty(window, "__VVENVE__");
//     Reflect.deleteProperty(window, "__VVENVE_PUBLIC__");
//     window.__VVENVE__ = createPrivateContext(await vm);
//     window.__VVENVE_PUBLIC__ = createPublicContext();

//     console.log(WindowManager());

//     (await WindowManager()).mount("body");
//     console.log("abcd");
//     Draggable(
//         { x: wrap(100), y: wrap(100) },
//         {
//             content: () => Triangle().$.data({ region: "true" }),
//         },
//     ).mount("body");

//     guardWindows();
// });

const a = wrap(2);
const b = wrap(1);
const sum = sync(() => String(a.get() + b.get()), [a, b]);

createComponent({}, () => tree("div").append(
    $(sum),
    tree("button")
        .on("click", () => a.set(a.get() + 1))
        .append("+1")
))().mount("#app");
