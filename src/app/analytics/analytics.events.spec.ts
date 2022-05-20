import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { AppState } from '../app.store';
import { ANALYTICS_EVENTS } from './analytics.events';

describe('Feature analytics', () => {
  const state: AppState = {
    fibonacci: { isLoading: false },
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
