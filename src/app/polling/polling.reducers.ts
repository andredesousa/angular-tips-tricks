import { createReducer, on } from '@ngrx/store';

import { startPolling, stopPolling, fetchedNewMessage } from './polling.actions';
import { initialState } from './polling.state';

export const pollingReducer = createReducer(
  initialState,
  on(startPolling, state => ({
    ...state,
    isPolling: true,
  })),
  on(stopPolling, state => ({
    ...state,
    isPolling: false,
  })),
  on(fetchedNewMessage, (state, { message }) => ({
    ...state,
    messages: [...state.messages, message],
  })),
);
