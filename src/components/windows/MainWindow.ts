import {
    $,
    createComponent,
    styleSet,
    sync,
    tree,
    when,
    wrap,
    Wrapper,
} from "nine";
import SubWindow from "../SubWindow";
import { isVMObtained, wrappedVM } from "../../state/vm";
import vm from "$/vm";
import Button from "../Button";
import {
    guardWindows,
    injectedState,
    mainShowing,
    projectShowing,
    watcherShowing,
} from "src/state/window";
import SpriteTarget from "../target/SpriteTarget";
const getVVenve = () => {
    const _vm = vm as VM;
    let banKey: string | null = null;
    const handler: ProxyHandler<Window["__VVENVE__"]> = {
        set(
            target: Window["__VVENVE__"],
            p: keyof Window["__VVENVE__"],
            _value: Window["__VVENVE__"][keyof Window["__VVENVE__"]],
            _receiver: any,
        ) {
            if (!injectedState.get()) return true;
            if (p === "injected") return true;
            return Reflect.set(target, p, _value, _receiver);
        },
        defineProperty(_target, _p, _descriptor) {
            if (!injectedState.get()) return true;
            return Reflect.defineProperty(_target, _p, _descriptor);
        },
        setPrototypeOf(_target, _proto) {
            if (!injectedState.get()) return true;
            return Reflect.setPrototypeOf(_target, _proto);
        },
        deleteProperty(_target, _p) {
            return true;
        },
    };
    let sealed = false;
    const ban = () => {
        if (banKey !== null) return "";
        banKey = crypto.randomUUID();
        injectedState.set(false);
        result.injected = false;
        mainShowing.set(false);
        watcherShowing.set(false);
        projectShowing.set(false);
        if (!sealed) {
            window.__VVENVE__ = new Proxy(window.__VVENVE__, handler);
            try {
                Object.defineProperty(window, "__VVENVE__", {
                    configurable: false,
                    writable: false,
                });
            } catch (_) {
                console.error(_);
            }
            sealed = true;
        }
        return banKey;
    };
    const unban = (key: string) => {
        if (banKey === null || key !== banKey) return false;
        banKey = null;
        injectedState.set(true);
        result.injected = true;
        return true;
    };
    const result: Window["__VVENVE__"] = { vm: _vm, injected: true, ban, unban };
    return result;
};
export default createComponent(
    {
        styles: [
            styleSet(".sprites")
                .display("flex")
                .flexDirection("column")
                .maxWidth("50vw"),
        ],
    },
    () => {
        const targetShowing: Record<string, Wrapper<boolean>> = {};
        window.__VVENVE__ = getVVenve();
        guardWindows();
        return SubWindow(
            { x: wrap(100), y: wrap(100), showing: mainShowing },
            {
                title: (title) => tree("img").class("logo").src(title),
                content: () =>
                    tree("div").append(
                        "已获取VM：",
                        isVMObtained,
                        when(isVMObtained, () =>
                            Button({ text: "打印到控制台" }).$.on("click", () =>
                                console.log(vm),
                            ),
                        ),
                        when(isVMObtained, () =>
                            tree("div")
                                .class("sprites")
                                .append(
                                    Button({ text: "项目管理器" }).$.on(
                                        "click",
                                        () => projectShowing.set(true),
                                    ),
                                    Button({ text: "视奸变量" }).$.on(
                                        "click",
                                        () => watcherShowing.set(true),
                                    ),
                                    $(
                                        sync(
                                            () =>
                                                wrappedVM!
                                                    .get()
                                                    .targets.map((t) => {
                                                        if (
                                                            !targetShowing[
                                                                t.name
                                                            ]
                                                        )
                                                            targetShowing[
                                                                t.name
                                                            ] = wrap(false);
                                                        return SpriteTarget({
                                                            data: t,
                                                            showing:
                                                                targetShowing[
                                                                    t.name
                                                                ],
                                                        });
                                                    }),
                                            [wrappedVM],
                                        ),
                                    ),
                                ),
                        ),
                    ),
            },
        );
    },
);
