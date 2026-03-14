import { createPrivateContext, createPublicContext } from "./api/context";
import Draggable from "./components/Draggable";
import WindowManager from "./components/manager/WindowManager";
import Triangle from "./components/Triangle";
import { wrap } from "./nine";
import { onObtainVM, vm, wrappedVM } from "./state/vm";
import { guardWindows } from "./state/window";
import { isNativeProxy } from "./util/validate";

onObtainVM.subcribe(async () => {
    if (!isNativeProxy(window.Proxy)) {
        console.error("疑似注入");
        alert("妈呀大姐 吓死人了🙄💅，你个臭贝贝是不是改惹Proxy构造器想绕过本🉑的私有鉴权接口，被本🉑发现惹🥵这么会hijack可以去仓库提个PR哈🥵🍆。");
        return;
    }
    if (IS_DEVELOPMENT) {
        console.log(wrappedVM);
    }

    // 开发环境的HMR实现，删掉旧的组件和上下文
    document.querySelectorAll("#vvenve-dragger").forEach(e => e.remove());
    // 要先把旧的私有上下文删了来再建新的
    Reflect.deleteProperty(window, "__VVENVE__");
    window.__VVENVE__ = createPrivateContext(await vm);
    window.__VVENVE_PUBLIC__ = createPublicContext();

    (await WindowManager()).mount("body");
    Draggable(
        { x: wrap(100), y: wrap(100) },
        {
            content: () => Triangle(),
        },
    ).mount("body");

    guardWindows();
});
