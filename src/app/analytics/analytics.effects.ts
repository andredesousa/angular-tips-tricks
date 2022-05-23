import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, tap, withLatestFrom } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { AppState } from '../app.store';
import { AllActionTypes, ANALYTICS_EVENTS } from './analytics.events';

@Injectable()
export class AnalyticsEffects {
  readonly featureTracking$ = createEffect(
    () =>
      this.actions$.pipe(
        filter(() => environment.analytics),
        withLatestFrom(this.store),
        tap(([action, state]) => {
          const createEvent = ANALYTICS_EVENTS[action.type as AllActionTypes];

          if (createEvent) {
            window.dataLayer.push(createEvent(state as AppState));
          }
        }),
      ),
    { dispatch: false },
  );

  constructor(private readonly actions$: Actions, private readonly store: Store) {}
}
