import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';

import { appError, ErrorCode } from './error-handler.actions';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private readonly injector: Injector) {}

  handleError(error: Error): void {
    if (environment.production) {
      this.injector.get(Store).dispatch(
        appError({
          error: {
            code: ErrorCode.INTERNAL_ERROR,
            message: 'Internal App Error',
          },
        }),
      );
    }

    console.error(error);
  }
}
