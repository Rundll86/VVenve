import * as assets from "./assets";

export function getAsset(name: keyof typeof assets) {
    return assets[name];
}

export * from "./channel";
export * from "./ui";
export * from "./util";
