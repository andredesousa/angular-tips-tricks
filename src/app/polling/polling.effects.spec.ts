import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { getTestScheduler } from 'jasmine-marbles';
import { take } from 'rxjs';

import { fetchedNewMessage } from './polling.actions';
import { PollingEffects } from './polling.effects';
import { PollingState, stateKey } from './polling.state';

describe('Polling effects', () => {
  let effects: PollingEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PollingEffects,
        provideMockStore({
          initialState: { [stateKey]: { isPolling: true, messages: [] } as PollingState },
        }),
      ],
    });

    effects = TestBed.inject(PollingEffects);
  });

  it('should emit new messages after 5000 ms', () => {
    const action = fetchedNewMessage({ message: 'New message from system' });

    getTestScheduler().run(({ expectObservable }) => {
      expectObservable(effects.polling$.pipe(take(1))).toBe('5000ms (a|)', { a: action });
    });
  });
});
