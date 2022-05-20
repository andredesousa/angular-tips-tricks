import { createAction, props } from '@ngrx/store';

export const enum ActionTypes {
  GENERATE_FIBONACCI = '[Fibonacci] Generate Fibonacci',
  GENERATE_FIBONACCI_SUCCESS = '[Fibonacci] Generate Fibonacci Success',
}

export const generateFibonacci = createAction(
  ActionTypes.GENERATE_FIBONACCI,
  props<{ value: number }>()
);

export const generateFibonacciSuccess = createAction(
  ActionTypes.GENERATE_FIBONACCI_SUCCESS,
  props<{ value: number }>(),
);
