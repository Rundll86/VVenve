import { vm as obtainVM } from "scratch-obtain";
import { WrappedVM, wrapVM } from "src/api/vm";
import { EventSubcriber, wrap, Wrapper } from "nine";

export const vm = obtainVM([OBTAINER]).then(newVM => {
    if (!newVM) return null;
    wrappedVM = wrapVM(newVM);
    isVMObtained.set(true);
    onObtainVM.emit(newVM);
    return newVM;
}) as Promise<VM>;
export const isVMObtained: Wrapper<boolean> = wrap(false);
export const onObtainVM = new EventSubcriber<[VM]>();

export let wrappedVM: Wrapper<WrappedVM>;
