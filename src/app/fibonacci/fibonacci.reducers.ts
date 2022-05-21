import { createReducer, on } from '@ngrx/store';

import { generateFibonacci, generateFibonacciSuccess } from './fibonacci.actions';
import { initialState } from './fibonacci.state';

export const fibonacciReducer = createReducer(
  initialState,
  on(generateFibonacci, (state, { value }) => ({
    ...state,
    fibonacciPosition: value,
    isLoading: true,
  })),
  on(generateFibonacciSuccess, (state, { value }) => ({
    ...state,
    fibonacciNumber: value,
    isLoading: false,
  })),
);
