import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PollingState, stateKey } from './polling.state';

const selectPollingState = createFeatureSelector<PollingState>(stateKey);

export const selectIsPolling = createSelector(selectPollingState, state => state.isPolling);

export const selectMessages = createSelector(selectPollingState, state => state.messages);
