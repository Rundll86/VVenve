import Draggable from "./components/Draggable";
import Triangle from "./components/Triangle";
import MainWindow from "./components/windows/MainWindow";
import { wrap } from "./nine";

const mainShowing = wrap(true);

MainWindow({ hidding: mainShowing }).mount("body");
Draggable({ x: wrap(100), y: wrap(100) }, {
    content: () => Triangle({ showing: mainShowing })
}).mount("body");
