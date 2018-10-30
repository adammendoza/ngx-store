import { NgxStorage } from './storage';
import { StorageName } from '../webstorage.utility';
export declare class SharedStorage extends NgxStorage {
    protected sharedMap: Map<string, any>;
    constructor();
    readonly type: StorageName;
    readonly length: number;
    key(index: number): string | any;
    getItem(key: string): any;
    removeItem(key: string): void;
    setItem(key: string, value: any): void;
    clear(): void;
    forEach(func: (value: string, key: any) => any): void;
    protected getAllKeys(): Array<string>;
}
export declare const sharedStorage: SharedStorage;