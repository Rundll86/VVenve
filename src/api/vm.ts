import { wrap, Wrapper } from "nine";
import { patchArray } from "src/state/patch/array";

export interface WrappedVM {
    targets: WrappedTarget[];
    watchings: VariableReference[];
    addWatch(target: string, name: string): void;
    toggleWatch(target: string, name: string): void;
    removeWatch(target: string, name: string): void;
    isWatching(target: string, name: string): boolean;
    findVariable(target: string, name: string): WrappedVariable | null;
}
export interface WrappedTarget {
    name: string;
    variables: WrappedVariable[];
    isStage: boolean;
}
export type ScratchValue = VM.ScratchCompatibleValue | VM.ScratchList;
export interface VariableReference {
    target: string;
    name: string;
}
export interface WrappedVariable {
    name: string;
    value: ScratchValue;
    isList: boolean;
    target: string;
}

export function wrapVM(scratchVM: VM): Wrapper<WrappedVM> {
    const cast = (scratchTargets: VM.Target[]) => {
        wrappedVM.get().targets = scratchTargets.map((scratchTarget: VM.Target): WrappedTarget => {
            const wrappedTarget: WrappedTarget = {
                name: scratchTarget.getName(),
                variables: Object.values(scratchTarget.variables).map((scratchVariable: VM.Variable): WrappedVariable => {
                    const wrappedVariable: WrappedVariable = {
                        name: scratchVariable.name,
                        value: scratchVariable.value,
                        isList: scratchVariable.type === "list",
                        target: scratchTarget.getName(),
                    };
                    Object.defineProperty(scratchVariable, "value", {
                        configurable: true,
                        set(newValue) {
                            wrappedVariable.value = newValue;
                        },
                        get() {
                            return wrappedVariable.value;
                        },
                    });
                    Object.defineProperty(scratchVariable, "name", {
                        configurable: true,
                        set(newValue) {
                            wrappedVariable.name = newValue;
                            wrappedVM.updateOnly();
                        },
                        get() {
                            return wrappedVariable.name;
                        },
                    });
                    return wrappedVariable;
                }),
                isStage: scratchTarget.isStage
            };
            scratchTarget.variables = new Proxy(scratchTarget.variables, {
                set(target, p, newValue, receiver) {
                    const orig = Reflect.get(target, p, receiver);
                    if (orig) {
                        wrappedTarget.variables = wrappedTarget.variables.filter(e => e !== orig);
                    }
                    wrappedTarget.variables.push(newValue);
                    wrappedVM.updateOnly();
                    return Reflect.set(target, p, newValue, receiver);
                },
                deleteProperty(target, p) {
                    const orig = Reflect.get(target, p);
                    if (orig) {
                        wrappedTarget.variables = wrappedTarget.variables.filter(e => e !== orig);
                        wrappedVM.updateOnly();
                    }
                    return Reflect.deleteProperty(target, p);
                },
            });
            return wrappedTarget;
        });
    };
    const wrappedVM = wrap<WrappedVM>({
        targets: [],
        watchings: [],
        addWatch(target, name) {
            this.watchings.push({ target, name });
            wrappedVM.updateOnly();
        },
        toggleWatch(target, name) {
            if (this.isWatching(target, name)) {
                this.removeWatch(target, name);
            } else {
                this.addWatch(target, name);
            }
            wrappedVM.updateOnly();
        },
        removeWatch(target, name) {
            this.watchings = this.watchings.filter(e => e.target !== target || e.name !== name);
            wrappedVM.updateOnly();
        },
        isWatching(target, name) {
            return this.watchings.some(e => e.target === target && e.name === name);
        },
        findVariable(target, name) {
            return this.targets.find(e => e.name === target)?.variables.find(e => e.name === name) || null;
        },
    });
    cast(scratchVM.runtime.targets);
    const { hooks, patched } = patchArray(scratchVM.runtime, "targets");
    scratchVM.runtime = patched;
    hooks.updated.subcribe(cast);
    return wrappedVM;
}