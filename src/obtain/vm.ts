import type VM from "scratch-vm";

interface ReactFiber {
    memoizedProps?: {
        vm: VM;
    };
    pendingProps?: {
        vm: VM;
    };
    stateNode?: {
        props?: {
            vm: VM;
        }
    };
    return: ReactFiber;
}
type ReactFiberKey = `__reactFiber$${string}` | `__reactInternalInstance$${string}`;

function obtainVM(): VM | null {
    const selectors = [
        "[class*=\"stage\"]",
        "canvas",
        "#app > div > div",
        "[class*=\"gui\"]",
        "[class*=\"blocks\"]"
    ];
    for (const element of document.querySelectorAll<HTMLElement & Record<ReactFiberKey, ReactFiber>>(selectors.join(","))) {
        const fieldKey = Object.keys(element).find(k =>
            k.startsWith("__reactFiber$") || k.startsWith("__reactInternalInstance$")
        ) as ReactFiberKey;
        if (!fieldKey) continue;
        let fiber = element[fieldKey];
        while (fiber) {
            const vm = fiber.memoizedProps?.vm || fiber.pendingProps?.vm
                || fiber.stateNode?.props?.vm;
            if (vm) return vm;
            fiber = fiber.return;
        }
    }
    return null;
}
const vm = obtainVM();

export default vm;