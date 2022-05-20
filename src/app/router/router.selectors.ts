import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppRouterState, stateKey } from './router.state';

const selectRouterState = createFeatureSelector<AppRouterState>(stateKey);

export const selectRouterData = createSelector(selectRouterState, (routerState: AppRouterState) =>
  routerState ? routerState.state.data : {},
);
