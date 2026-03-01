import { WrappedTarget } from "src/components/target/SpriteTarget";
import { wrapVariable } from "./variable";

export function wrapTarget(scratchTarget: VM.Target): WrappedTarget {
    const wrapper: WrappedTarget = {
        name: scratchTarget.getName(),
        variables: Object.values(scratchTarget.variables).map(wrapVariable),
        isStage: scratchTarget.isStage
    };
    scratchTarget.variables = new Proxy(scratchTarget.variables, {
        set(target, p, newValue, receiver) {
            const orig = Reflect.get(target, p, receiver);
            if (orig) {
                wrapper.variables = wrapper.variables.filter(e => e !== orig);
            }
            wrapper.variables.push(newValue);
            return Reflect.set(target, p, newValue, receiver);
        },
        deleteProperty(target, p) {
            const orig = Reflect.get(target, p);
            if (orig) {
                wrapper.variables = wrapper.variables.filter(e => e !== orig);
            }
            return Reflect.deleteProperty(target, p);
        },
    });
    return wrapper;
}