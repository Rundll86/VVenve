interface SubcriberCallback<T, O> {
    (data: T, options: O): void;
}
interface Subcriber<T, O> {
    options: O;
    callback: SubcriberCallback<T, O>;
    once: boolean;
}
export class EventSubcriber<T, O = void> {
    private subcribers: Subcriber<T, O>[] = [];
    private defaultOptions?: O;

    constructor(defaultOptions?: O) {
        this.defaultOptions = defaultOptions;
    }
    subcribe(callback: SubcriberCallback<T, O>, options?: O, once = false) {
        this.subcribers.push({
            options: Object.assign({}, this.defaultOptions, options ?? {}),
            callback,
            once,
        });
    }
    async once(options?: O) {
        return new Promise<{ data: T, options: O }>((resolve) => {
            this.subcribe((data, options) => resolve({ data, options }), options, true);
        });
    }
    emit(data: T) {
        for (const subcriber of this.subcribers) {
            subcriber.callback(data, subcriber.options);
        }
    }
}