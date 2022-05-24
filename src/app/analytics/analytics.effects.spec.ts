import { getMockStore } from '@ngrx/store/testing';
import { routerNavigatedAction } from '@ngrx/router-store';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { environment } from 'src/environments/environment';

import { AnalyticsEffects } from './analytics.effects';

describe('AnalyticsEffects', () => {
  let action: Action;
  let effects: AnalyticsEffects;

  beforeEach(() => {
    window.dataLayer = { push: jasmine.createSpy() };
    action = routerNavigatedAction({ payload: {} as any });
    effects = new AnalyticsEffects(hot('-a', { a: action }), getMockStore({ initialState: {} }));
  });

  afterEach(() => {
    environment.analytics = false;
  });

  it('should not call window.dataLayer', () => {
    expect(effects.featureTracking$).toBeObservable(cold('--'));
    expect(window.dataLayer.push).not.toHaveBeenCalled();
  });

  it('should call window.dataLayer', () => {
    environment.analytics = true;

    expect(effects.featureTracking$).toBeObservable(cold('-a', { a: [action, {}] }));
    expect(window.dataLayer.push).toHaveBeenCalledWith({
      customTrackerId: 'GTM-XXXX',
      event: 'event',
      eventAction: '@ngrx/router-store/navigated',
      eventCategory: 'navigated',
      eventLabel: 'router navigated',
    });
  });
});
