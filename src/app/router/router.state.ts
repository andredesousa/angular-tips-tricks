import { Data, Params } from '@angular/router';
import { RouterReducerState } from '@ngrx/router-store';

export const stateKey = 'router';

export interface RouterState {
  data: Data;
  params: Params;
  queryParams: Params;
  url: string;
}

export type AppRouterState = RouterReducerState<RouterState>;
