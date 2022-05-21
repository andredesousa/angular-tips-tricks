import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { fibonacciReducer } from './fibonacci/fibonacci.reducers';
import { pollingReducer } from './polling/polling.reducers';
import { FibonacciState, stateKey as fibonacci } from './fibonacci/fibonacci.state';
import { PollingState, stateKey as polling } from './polling/polling.state';
import { AppRouterState, stateKey as router } from './router/router.state';

export interface AppState {
  [router]: AppRouterState;
  [fibonacci]: FibonacciState;
  [polling]: PollingState;
}

/**
 * Aggregates all reducers which form the state.
 */
export const reducers: ActionReducerMap<AppState> = {
  router: (state, action) => routerReducer(state, action) || null,
  fibonacci: fibonacciReducer,
  polling: pollingReducer,
};
