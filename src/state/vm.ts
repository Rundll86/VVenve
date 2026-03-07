import { vm as obtainVM } from "scratch-obtain";
import { wrapVM } from "src/api/vm";

export const vm = await obtainVM(["Eureka", "ReactDom", "Trap"]);
export const isVMObtained = !!vm;
export const wrappedVM = vm ? wrapVM(vm) : null;
