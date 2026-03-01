import { WrappedVariable } from "src/components/target/VariableTarget";

export type ScratchValue = VM.ScratchCompatibleValue | VM.ScratchList;
export function wrapVariable(scratchVariable: VM.Variable): WrappedVariable {
    const variable: WrappedVariable = {
        name: scratchVariable.name,
        value: scratchVariable.value,
        isList: scratchVariable.type === "list"
    };
    Object.defineProperty(scratchVariable, "value", {
        configurable: true,
        set(newValue) {
            variable.value = newValue;
        },
        get() {
            return variable.value;
        },
    });
    Object.defineProperty(scratchVariable, "name", {
        configurable: true,
        set(newValue) {
            variable.name = newValue;
        },
        get() {
            return variable.name;
        },
    });
    return variable;
}