import { createAction, props } from '@ngrx/store';

export const enum ActionTypes {
  START_POLLING = '[Polling] Start Polling',
  STOP_POLLING = '[Polling] Stop Polling',
  FETCHED_NEW_MESSAGE = '[Polling] Fetched new message',
}

export const startPolling = createAction(ActionTypes.START_POLLING);

export const stopPolling = createAction(ActionTypes.STOP_POLLING);

export const fetchedNewMessage = createAction(
  ActionTypes.FETCHED_NEW_MESSAGE,
  props<{ message: string }>()
);
