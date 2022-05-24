import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { routerNavigatedAction } from '@ngrx/router-store';
import { cold, hot } from 'jasmine-marbles';
import { environment } from 'src/environments/environment';

import { AnalyticsEffects } from './analytics.effects';

describe('AnalyticsEffects', () => {
  let effects: AnalyticsEffects;

  beforeAll(() => {
    window.dataLayer = { push: jasmine.createSpy() };
    environment.production = true;
    environment.analytics = true;
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AnalyticsEffects,
        provideMockActions(() => hot('-a', { a: routerNavigatedAction({ payload: {} as any }) })),
        provideMockStore({ initialState: {} }),
      ],
    });

    effects = TestBed.inject(AnalyticsEffects);
  });

  it('should not call window.dataLayer', () => {
    expect(effects.featureTracking$).toBeObservable(cold('--'));
    expect(window.dataLayer.push).not.toHaveBeenCalled();
  });

  it('should call window.dataLayer', () => {
    expect(effects.featureTracking$).toBeObservable(cold('--'));
    expect(window.dataLayer.push).toHaveBeenCalledWith({
      customTrackerId: 'GTM-XXXX',
      event: 'event',
      eventAction: '@ngrx/router-store/navigated',
      eventCategory: 'navigated',
      eventLabel: 'router navigated',
    });
  });
});
