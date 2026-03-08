import Draggable from "./components/Draggable";
import Triangle from "./components/Triangle";
import MainWindow from "./components/windows/MainWindow";
import ProjectWindow from "./components/windows/ProjectWindow";
import WatcherWindow from "./components/windows/WatcherWindow";
import { wrap } from "./nine";

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
