import { wrap } from "nine";
export const mainShowing = wrap(false);
export const watcherShowing = wrap(false);
export const projectShowing = wrap(false);
export const injectedState = wrap(true);

const allShowings = [mainShowing, watcherShowing, projectShowing];

export function guardWindows() {
    for (const showing of allShowings) {
        showing.event.subcribe((val) => {
            if (val && !injectedState.get()) {
                showing.set(false);
            }
        });
    }
}
