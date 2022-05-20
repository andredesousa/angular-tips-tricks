import { createReducer, on } from '@ngrx/store';

import { generateFibonacci, generateFibonacciSuccess } from './fibonacci.actions';
import { initialState } from './fibonacci.state';

export const fibonacciReducer = createReducer(
  initialState,
  on(generateFibonacci, state => ({
    ...state,
    isLoading: true,
  })),
  on(generateFibonacciSuccess, state => ({
    ...state,
    isLoading: false,
  })),
);
