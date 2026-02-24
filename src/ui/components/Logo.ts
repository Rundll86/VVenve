import { createComponent } from "../component";
import { tree } from "../tree";
import logo from "../../assets/logo.svg";

export default createComponent(() => tree("img").src(logo));
