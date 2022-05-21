import { Injectable } from '@angular/core';
import { concatLatestFrom, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, interval, map } from 'rxjs';
import { environment } from 'src/environments/environment';

import { fetchedNewMessage } from './polling.actions';
import { selectIsPolling } from './polling.selectors';

@Injectable()
export class PollingEffects {
  readonly polling$ = createEffect(() =>
    interval(environment.pollingInterval).pipe(
      concatLatestFrom(() => this.store.select(selectIsPolling)),
      filter(([_, isPolling]) => isPolling),
      map(() => fetchedNewMessage({ message: 'New message from system' })),
    ),
  );

  constructor(private store: Store) {}
}
