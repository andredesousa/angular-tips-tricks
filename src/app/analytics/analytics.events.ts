import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { environment } from 'src/environments/environment';

import { AppState } from '../app.store';
import { ActionTypes as FibonacciActions } from '../fibonacci/fibonacci.actions';

export type AnalyticsEvent = {
  customTrackerId: string;
  event: string;
  eventAction: string;
  eventCategory: string;
  eventLabel: string;
};

export type AllActionTypes = FibonacciActions | typeof ROUTER_NAVIGATED;

export const ANALYTICS_EVENTS: { [action in AllActionTypes]?: (state: AppState) => AnalyticsEvent } = {
  [FibonacciActions.GENERATE_FIBONACCI]: state => ({
    customTrackerId: environment.customTrackerId,
    event: 'event',
    eventAction: FibonacciActions.GENERATE_FIBONACCI,
    eventCategory: 'clicked',
    eventLabel: 'button',
  }),
  [ROUTER_NAVIGATED]: state => ({
    customTrackerId: environment.customTrackerId,
    event: 'event',
    eventAction: ROUTER_NAVIGATED,
    eventCategory: 'navigated',
    eventLabel: 'router navigated',
  }),
};
