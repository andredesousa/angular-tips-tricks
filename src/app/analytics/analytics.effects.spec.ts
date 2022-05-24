import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { routerNavigatedAction } from '@ngrx/router-store';
import { Action, Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { cold, hot } from 'jasmine-marbles';
import { environment } from 'src/environments/environment';

import { AnalyticsEffects } from './analytics.effects';

describe('AnalyticsEffects', () => {
  let actions$: Actions;
  let action: Action;
  let effects: AnalyticsEffects;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState: {} })],
    });

    window.dataLayer = { push: jasmine.createSpy() };
    environment.analytics = true;
    store = TestBed.inject(Store);
  });

  it('should not call window.dataLayer', () => {
    actions$ = hot('--');
    effects = new AnalyticsEffects(actions$, store);

    expect(effects.featureTracking$).toBeObservable(cold('--'));
    expect(window.dataLayer.push).not.toHaveBeenCalled();
  });

  it('should call window.dataLayer', () => {
    action = routerNavigatedAction({ payload: {} as any });
    actions$ = hot('-a', { a: action });
    effects = new AnalyticsEffects(actions$, store);

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
