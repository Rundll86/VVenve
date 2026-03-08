import { vm as obtainVM } from "scratch-obtain";
import { WrappedVM, wrapVM } from "src/api/vm";
import { wrap, Wrapper } from "nine";

export let vm: VM | null = null;
obtainVM(["Eureka", "ReactDom", "Trap"]).then(v => {
    vm = v;
    isVMObtained.set(!!vm);
    if (vm) wrappedVM = wrapVM(vm);
});

export const isVMObtained: Wrapper<boolean> = wrap(false);
export let wrappedVM: Wrapper<WrappedVM>;
