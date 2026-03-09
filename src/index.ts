import Draggable from "./components/Draggable";
import Triangle from "./components/Triangle";
import MainWindow from "./components/windows/MainWindow";
import ProjectWindow from "./components/windows/ProjectWindow";
import WatcherWindow from "./components/windows/WatcherWindow";
import { wrap } from "./nine";
import { isNativeProxy } from "./util/validate";

if (isNativeProxy(window.Proxy)) {
    document.querySelectorAll("#vvenve-dragger").forEach((e) => {
        e.remove();
    });
    Reflect.deleteProperty(window, "__VVENVE__");

    MainWindow().mount("body");
    WatcherWindow().mount("body");
    ProjectWindow().mount("body");

    Draggable(
        { x: wrap(100), y: wrap(100) },
        {
            content: () => Triangle(),
        },
    ).mount("body");
} else {
    alert("妈呀大姐 吓死人了🙄💅，你个臭贝贝是不是改惹Proxy构造器想绕过本🉑的私有鉴权接口，被本🉑发现惹🥵这么会编程可以去仓库提个PR哈🥵🍆。");
}