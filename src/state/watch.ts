import { wrap } from "nine";
import { WrappedVariable } from "./vm";

export const watchings = wrap<WrappedVariable[]>([]);
export function removeWatching(data: WrappedVariable) {
    watchings.set(watchings.get().filter(e => e !== data));
}
