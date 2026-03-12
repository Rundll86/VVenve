import { wrap } from "nine";
import { getAllWindows } from "src/components/manager/WindowManager";

export const injectedState = wrap(true);

export function guardWindows() {
    for (const showing of getAllWindows().map(i => i.showing)) {
        showing.event.subcribe((val) => {
            if (val && !injectedState.get()) {
                showing.set(false);
            }
        });
    }
}
