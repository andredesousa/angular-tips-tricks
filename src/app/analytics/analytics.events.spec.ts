import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { AppState } from '../app.store';
import { initialState as fibonacciInitialState } from '../fibonacci/fibonacci.state';
import { initialState as pollingInitialState } from '../polling/polling.state';
import { ANALYTICS_EVENTS } from './analytics.events';

describe('Feature analytics', () => {
  const state: AppState = {
    fibonacci: fibonacciInitialState,
    polling: pollingInitialState,
    router: {
      navigationId: 1,
      state: { data: {}, params: {}, queryParams: {}, url: 'localhost' },
    },
  };

  it('should get event for @ngrx/router-store/navigated action', () => {
    const createEvent = ANALYTICS_EVENTS[ROUTER_NAVIGATED];

    expect(createEvent && createEvent(state)).toEqual({
      customTrackerId: 'GTM-XXXX',
      event: 'event',
      eventAction: ROUTER_NAVIGATED,
      eventCategory: 'navigated',
      eventLabel: 'router navigated',
    });
  });
});
