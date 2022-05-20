import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { RouterNavigatedAction, routerNavigatedAction } from '@ngrx/router-store';
import { cold, hot } from 'jasmine-marbles';
import { environment } from 'src/environments/environment';

import { AnalyticsEffects } from './analytics.effects';

describe('AnalyticsEffects', () => {
  let action: RouterNavigatedAction;
  let actions$: Actions;
  let effects: AnalyticsEffects;
  let store: Store;

  beforeEach(() => {
    action = routerNavigatedAction({ payload: {} as any });
    actions$ = hot('-a', { a: action });
    effects = new AnalyticsEffects(actions$, store);
  });

  afterEach(() => {
    environment.production = false;
  });

  it('should not call window.dataLayer', () => {
    expect(effects.featureTracking$).toBeObservable(cold('--'));
    expect(window.dataLayer.push).not.toHaveBeenCalled();
  });

  it('should call window.dataLayer', () => {
    environment.production = true;

    expect(effects.featureTracking$).toBeObservable(cold('-a', { a: [action, {}] }));
    expect(window.dataLayer.push).toHaveBeenCalledWith({
      name: 'CHANGE_PROFILE',
      category: ['TVN', 'TVN_VIEW'],
    });
  });
});
