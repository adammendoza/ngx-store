import { NgxStorageEvent } from './storage-event';
import { Subject } from 'rxjs';
import { StorageName } from '../webstorage.utility';
export declare abstract class NgxStorage implements Storage {
    [key: string]: any;
    [index: number]: string;
    externalChanges: Subject<NgxStorageEvent>;
    abstract setItem(key: string, value: any): void;
    abstract removeItem(key: string): void;
    abstract getItem(key: string): any;
    abstract key(index: number): any;
    abstract clear(): void;
    abstract readonly length: number;
    abstract readonly type: StorageName;
    protected emitEvent(key: string, newValue: any, oldValue?: any): void;
}