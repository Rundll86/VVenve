import { wrap, Wrapper } from "nine";
import { patchArray } from "src/state/patch/array";

export interface VariableMetadata {
    reference: VariableReference;
    description: string;
    locked: boolean;
    watching: boolean;
}
export interface WrappedVM {
    targets: WrappedTarget[];
    findVariable(target: string, name: string): WrappedVariable | null;

    metadatas: VariableMetadata[];
    setMetadata<K extends keyof VariableMetadata>(target: string, name: string, data: K, value: VariableMetadata[K]): void;
    getMetadata<K extends keyof VariableMetadata>(target: string, name: string, data: K): VariableMetadata[K] | null;
    toggleMetadata<K extends keyof { [K in keyof VariableMetadata as VariableMetadata[K] extends boolean ? K : never]: unknown }>(target: string, name: string, data: K): void;
    findMetadata(target: string, name: string): VariableMetadata | null;
}
export interface WrappedTarget {
    name: string;
    variables: WrappedVariable[];
    isStage: boolean;
    isClone: boolean;
}
export type ScratchValue = VM.ScratchCompatibleValue | VM.ScratchList;
export interface VariableReference {
    target: string;
    name: string;
}
export interface WrappedVariable {
    name: string;
    value: Wrapper<ScratchValue>;
    isList: boolean;
    target: string;
}

export function wrapVariable(
    scratchVariable: VM.Variable,
    vm: Wrapper<WrappedVM>,
    targetName: string,
): WrappedVariable {
    const wrappedVariable: WrappedVariable = {
        name: scratchVariable.name,
        value: wrap(scratchVariable.value),
        isList: scratchVariable.type === "list",
        target: targetName,
    };
    Object.defineProperty(scratchVariable, "value", {
        configurable: true,
        set(newValue) {
            if (vm.get().getMetadata(wrappedVariable.target, wrappedVariable.name, "locked"))
                return;
            wrappedVariable.value.set(newValue);
        },
        get() {
            return wrappedVariable.value.get();
        },
    });
    Object.defineProperty(scratchVariable, "name", {
        configurable: true,
        set(newValue) {
            const oldVariable = vm.get().findMetadata(wrappedVariable.target, wrappedVariable.name);
            if (oldVariable) {
                oldVariable.reference.name = newValue;
            }
            wrappedVariable.name = newValue;
            vm.updateOnly();
        },
        get() {
            return wrappedVariable.name;
        },
    });
    return wrappedVariable;
}
export function wrapVM(scratchVM: VM): Wrapper<WrappedVM> {
    const cast = (scratchTargets: VM.Target[]) => {
        wrappedVM.get().targets = scratchTargets.map(
            (scratchTarget: VM.Target): WrappedTarget => {
                const currentName = `${scratchTarget.getName()}${!scratchTarget.isOriginal ? `#${scratchTarget.id}` : "@self"}`;
                const wrappedTarget: WrappedTarget = {
                    name: currentName,
                    variables: Object.values(scratchTarget.variables).map((v) =>
                        wrapVariable(v, wrappedVM, currentName),
                    ),
                    isStage: scratchTarget.isStage,
                    isClone: !scratchTarget.isOriginal,
                };
                scratchTarget.variables = new Proxy(scratchTarget.variables, {
                    set(target, p, newValue, receiver) {
                        const orig = Reflect.get(target, p, receiver);
                        if (orig) {
                            wrappedTarget.variables = wrappedTarget.variables.filter(
                                (e) => e !== orig,
                            );
                        }
                        wrappedTarget.variables.push(
                            wrapVariable(newValue, wrappedVM, currentName),
                        );
                        wrappedVM.updateOnly();
                        return Reflect.set(target, p, newValue, receiver);
                    },
                    deleteProperty(target, p) {
                        const orig = Reflect.get(target, p);
                        if (orig) {
                            wrappedTarget.variables = wrappedTarget.variables.filter(
                                (e) => e !== orig,
                            );
                            wrappedVM.updateOnly();
                        }
                        return Reflect.deleteProperty(target, p);
                    },
                });
                return wrappedTarget;
            },
        );
    };
    const wrappedVM = wrap<WrappedVM>({
        targets: [],
        findVariable(target, name) {
            return (
                this.targets
                    .find((e) => e.name === target)
                    ?.variables.find((e) => e.name === name) || null
            );
        },

        metadatas: [],
        findMetadata(target, name) {
            return this.metadatas.find(m => m.reference.target === target && m.reference.name === name) ?? null;
        },
        setMetadata(target, name, data, value) {
            const metadata = this.findMetadata(target, name);
            if (metadata) {
                metadata[data] = value;
                wrappedVM.updateOnly();
            }
        },
        getMetadata(target, name, data) {
            return this.findMetadata(target, name)?.[data] ?? null;
        },
        toggleMetadata(target, name, data) {
            this.setMetadata(target, name, data, !this.getMetadata(target, name, data));
        },
    });
    cast(scratchVM.runtime.targets);
    const { hooks, patched } = patchArray(scratchVM.runtime, "targets");
    scratchVM.runtime = patched;
    hooks.updated.subcribe(cast);
    return wrappedVM;
}
