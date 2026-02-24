declare global {
    interface ObjectConstructor {
        entries<K, V>(data: Record<K, V>): [K, V][];
    }
}
declare module "*.svg" {
    const content: string;
    export default content;
}
export { };