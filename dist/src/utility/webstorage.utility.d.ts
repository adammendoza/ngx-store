import { DecoratorConfig } from '../ngx-store.types';
import { WebStorage } from './storage/cookies-storage';
import { Subject } from 'rxjs';
import { NgxStorageEvent } from './storage/storage-event';
import { Observable } from 'rxjs';
export declare type StorageName = 'localStorage' | 'sessionStorage' | 'cookiesStorage' | 'sharedStorage';
export declare class WebStorageUtility {
    protected _prefix: string;
    protected _storage: WebStorage;
    protected _changes: Subject<NgxStorageEvent>;
    static getSettable(value: any): string;
    static getGettable(value: string): any;
    constructor(storage: WebStorage, prefix: string, previousPrefix?: string);
    readonly prefix: string;
    readonly keys: Array<string>;
    readonly changes: Observable<NgxStorageEvent>;
    getStorage(): WebStorage;
    getStorageKey(key: string, prefix?: string): string;
    getStorageName(): StorageName;
    get(key: string, config?: DecoratorConfig): any;
    set<T>(key: string, value: T, config?: DecoratorConfig): T;
    remove(key: string, config?: DecoratorConfig): void;
    clear(): void;
    forEach(callbackFn: (value: any, key: string) => any): void;
    getSettable(value: any): string;
    getGettable(value: string): any;
    trimPrefix(key: string): string;
    protected emitEvent(key: string, newValue: any, oldValue?: any): void;
}