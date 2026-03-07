export interface VVenveContext {
    vm: VM;
    injected: boolean;
    ban(): string;
    unban(key: string): boolean;
}