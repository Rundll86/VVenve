import { wrap, Wrapper } from "nine";
import { WrappedVariable } from "src/components/target/VariableTarget";

export type ScratchValue = VM.ScratchCompatibleValue | VM.ScratchList;
export function wrapVariable(scratchVariable: VM.Variable): Wrapper<WrappedVariable> {
    const valueWrapper: Wrapper<ScratchValue> = wrap(scratchVariable.value);
    const wrapper: Wrapper<WrappedVariable> = wrap({
        name: scratchVariable.name,
        value: valueWrapper,
        isList: scratchVariable.type === "list"
    });
    Object.defineProperty(scratchVariable, "value", {
        configurable: true,
        set(newValue) {
            valueWrapper.set(newValue);
        },
        get() {
            return valueWrapper.get();
        },
    });
    Object.defineProperty(scratchVariable, "name", {
        configurable: true,
        set(newValue) {
            wrapper.get().name = newValue;
        },
        get() {
            return wrapper.get().name;
        },
    });
    return wrapper;
}