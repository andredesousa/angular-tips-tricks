import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { fibonacciReducer } from './fibonacci/fibonacci.reducers';
import { FibonacciState, stateKey as fibonacci } from './fibonacci/fibonacci.state';
import { AppRouterState, stateKey as  router} from './router/router.state';

export interface AppState {
  [router]: AppRouterState;
  [fibonacci]: FibonacciState,
}

/**
 * Aggregates all reducers which form the state.
 */
export const reducers: ActionReducerMap<AppState> = {
  router: (state, action) => routerReducer(state, action) || null,
  fibonacci: fibonacciReducer
};

