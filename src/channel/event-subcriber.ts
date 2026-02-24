interface SubcriberCallback<T extends unknown[]> {
    (...data: T): void;
}
interface Subcriber<T extends unknown[], O> {
    options: O;
    callback: SubcriberCallback<T>;
    once: boolean;
}
export class EventSubcriber<T extends unknown[], O = void> {
    private subcribers: Subcriber<T, O>[] = [];
    private defaultOptions?: O;

    constructor(defaultOptions?: O) {
        this.defaultOptions = defaultOptions;
    }
    subcribe(callback: SubcriberCallback<T>, options?: O, once = false) {
        this.subcribers.push({
            options: Object.assign({}, this.defaultOptions, options ?? {}),
            callback,
            once,
        });
    }
    async once(options?: O) {
        return new Promise<{ data: T }>((resolve) => {
            this.subcribe((...data) => resolve({ data }), options, true);
        });
    }
    emit(...data: T) {
        for (const subcriber of this.subcribers) {
            subcriber.callback(...data);
        }
    }
}