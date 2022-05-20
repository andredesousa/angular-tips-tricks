import { createAction, props } from '@ngrx/store';

export const enum ErrorCode {
  UNKNOWN_ERROR = '0',
  UNAUTHORIZED = '401',
  FORBIDDEN = '403',
  NOT_FOUND = '404',
  REQUEST_TIMEOUT = '408',
  PAYLOAD_TOO_LARGE = '413',
  LOGIN_TIMEOUT = '440',
  INTERNAL_ERROR = 'ERROR',
}

export interface AppError {
  code: ErrorCode;
  message: string;
}

export const enum ActionTypes {
  APP_ERROR = '[App] Internal Error',
}

export const appError = createAction(
  ActionTypes.APP_ERROR,
  props<{ error: AppError }>()
);
