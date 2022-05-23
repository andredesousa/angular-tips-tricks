import { Store } from '@ngrx/store';
import { Injector } from '@angular/core';
import { environment } from 'src/environments/environment';

import { GlobalErrorHandler } from './error-handler.service';
import { appError, ErrorCode } from './error-handler.actions';

describe('GlobalErrorHandler', () => {
  let service: GlobalErrorHandler;
  let injector: Injector;
  let store: Store;

  beforeEach(() => {
    store = jasmine.createSpyObj<Store>('Store', ['dispatch']);
    injector = { get: (): Store<unknown> => store };
    service = new GlobalErrorHandler(injector);

    spyOn(console, 'error');
  });

  afterEach(() => {
    environment.production = false;
  });

  it('should not dispatch the error action', () => {
    spyOn(injector, 'get');

    service.handleError(new Error());

    expect(console.error).toHaveBeenCalledWith(new Error());
    expect(injector.get).not.toHaveBeenCalled();
  });

  it('should dispatch the error action', () => {
    environment.production = true;

    service.handleError(new Error());

    expect(console.error).toHaveBeenCalledWith(new Error());
    expect(store.dispatch).toHaveBeenCalledWith(
      appError({
        error: {
          code: ErrorCode.INTERNAL_ERROR,
          message: 'Internal App Error',
        },
      }),
    );
  });
});
