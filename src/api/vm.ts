import { wrap, Wrapper } from "nine";
import { WrappedTarget } from "src/components/target/SpriteTarget";
import { wrapTarget } from "./target";
import { patchArray } from "src/state/patch/array";

export interface WrappedVM {
    targets: WrappedTarget[];
}
export function wrapVM(scratchVM: VM): Wrapper<WrappedVM> {
    const cast = (scratchTargets: VM.Target[]) => {
        const wrappedTargets = scratchTargets.map(wrapTarget);
        wrapper.get().targets = wrappedTargets;
    };
    const wrapper = wrap<WrappedVM>({
        targets: []
    });
    cast(scratchVM.runtime.targets);
    const { hooks, patched } = patchArray(scratchVM.runtime, "targets");
    scratchVM.runtime = patched;
    hooks.updated.subcribe(cast);
    return wrapper;
}