import { wrap } from "nine";

export type ScratchValue = VM.ScratchCompatibleValue | VM.ScratchList;
export function wrapVariable(scratchVariable: VM.Variable) {
    const wrapper = wrap<ScratchValue>(scratchVariable.value);
    Object.defineProperty(scratchVariable, "value", {
        configurable: true,
        set(newValue) {
            wrapper.set(newValue);
        },
        get() {
            return wrapper.get();
        },
    });
    return wrapper;
}