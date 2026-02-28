import vm from "$/vm";
import { ScratchValue, wrapVariable } from "src/api/variable";
import { Wrapper } from "nine";

export interface WrappedVariable {
    name: string;
    value: Wrapper<ScratchValue>;
    isList: boolean
}
export interface WrappedTarget {
    name: string;
    variables: WrappedVariable[];
}
export interface WrappedVM {
    targets: WrappedTarget[];
}

export const isVMObtained = !!vm;
export function getTargets() {
    return vm?.runtime.targets ?? [];
}
export const wrappedVM: WrappedVM = {
    targets: [...vm?.runtime.targets ?? []].map(t => ({
        name: t.getName(),
        variables: Object.values(t.variables).map(v => ({
            name: v.name,
            value: wrapVariable(v),
            isList: v.type === "list"
        }))
    }))
};