import { Store } from '@ngrx/store';
import { getTestScheduler } from 'jasmine-marbles';
import { PollingEffects } from './polling.effects';

describe('Polling effects', () => {
  let store: Store;
  let effects: PollingEffects;

  beforeEach(() => {
    effects = new PollingEffects(store);
  });

  it('should emit new messages after 5000 ms', () => {
    getTestScheduler().run(({ expectObservable }) => {
      expectObservable(effects.polling$).toBe('-a-b|', { a: 0, b: 2 });
    });
  });
});
