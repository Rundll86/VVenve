import { Component, ComponentEventStore, ComponentInstance, ComponentSlotStore, createComponent, sync, tree, wrap, Wrapper } from "nine";
import MainWindow from "../windows/MainWindow";
import ProjectWindow from "../windows/ProjectWindow";
import WatcherWindow from "../windows/WatcherWindow";

type WindowComponent = Component<{
    x: {
        transform: typeof Number
    },
    y: {
        transform: typeof Number
    },
    layer: {
        transform: typeof Number
    },
    showing: {
        transform: typeof Boolean
    },
    name: {
        transform: typeof String
    }
}, ComponentEventStore, ComponentSlotStore, boolean>;
interface WindowDescriptor {
    component: WindowComponent;
    name: string;
}
interface WindowInstance {
    component: ComponentInstance;
    showing: Wrapper<boolean>;
    name: string;
    layer: Wrapper<number>;
}

const windows: WindowDescriptor[] = [
    { component: MainWindow, name: "main" },
    { component: WatcherWindow, name: "watcher" },
    { component: ProjectWindow, name: "project" }
];
const instances = wrap<WindowInstance[]>([]);

export function getAllWindows() {
    return [...instances.get()];
}
export function getWindow(name: string) {
    return instances.get().find(ins => ins.name === name) ?? null;
}
export function setShowing(name: string, newState: boolean) {
    getWindow(name)?.showing.set(newState);
}
export function getShowing(name: string) {
    return getWindow(name)?.showing.get() ?? false;
}
export function pin(name: string) {
    const windows = getAllWindows();
    for (const window of windows) {
        if (window.name === name) {
            if (window.layer.get() !== 0) window.layer.set(0);
        } else {
            window.layer.set(window.layer.get() + 1);
        }
    }
}

export default createComponent({}, async () => {
    instances.set(
        await Promise.all(
            windows.map(async (window, i) => {
                const showingState = wrap(false);
                const layerCount = wrap(i);
                return {
                    component: await window.component({
                        x: wrap(100),
                        y: wrap(100),
                        showing: showingState,
                        name: window.name,
                        layer: layerCount
                    }),
                    showing: showingState,
                    name: window.name,
                    layer: layerCount
                };
            })
        )
    );
    console.log("test");

    return tree("div")
        .append(
            sync(() => instances.get().map(i => i.component))
        );
});