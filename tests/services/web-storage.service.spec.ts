import { inject, TestBed } from '@angular/core/testing';
import { LocalStorageService } from '../../ngx-store';
import {
    CookiesStorageService, SessionStorageService, SharedStorageService,
    WebStorageService
} from '../../src/service';
import { entries, fillWithData } from './web-storage.utils';

// Test common methods of WebStorageService children classes
test(LocalStorageService);
test(SessionStorageService);
test(CookiesStorageService);
test(SharedStorageService);

function test(storageService: typeof WebStorageService) {
    describe(storageService.name, () => {
        let service: WebStorageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [storageService],
            });
        });

        beforeEach(inject([storageService], (serviceInjection: typeof storageService) => {
            service = (serviceInjection as any as WebStorageService);
            fillWithData(service);
        }));

        describe('should set and save value', () => {
            function testSave(key) {
                it(key, () => {
                    expect(service.get(key)).toEqual(entries[key]);
                    expect(service.utility.get(key)).toEqual(entries[key]);
                });
            }
            Object.entries(entries).forEach(([key, value]) => {
                testSave(key);
            });
        });

        describe('should delete specified data', () => {
            const expectation = /null|undefined/;
            it('by key', () => {
                Object.entries(entries).forEach(([key, value]) => {
                    service.remove(key);
                    expect(service.get(key)).toMatch(expectation);
                });
            });

            it('by prefix', () => {
                service.clear('prefix');
                Object.entries(entries).forEach(([key, value]) => {
                    expect(service.get(key)).toMatch(expectation);
                });
            });

            it('all', () => {
                let expectedCount: RegExp;
                switch (service.constructor) {
                    case LocalStorageService:
                        // NGX-STORE_prefix will remain
                        expectedCount = /1/;
                        break;
                    case CookiesStorageService:
                        // HTTP-only cookies cannot be removed by JS
                        // so any entries count is expected
                        expectedCount = /[0-9]+/;
                        break;
                    default:
                        expectedCount = /0/;
                }
                service.clear('all');
                expect(service.utility['_storage'].length).toMatch(expectedCount);
            });
        });
    });
}