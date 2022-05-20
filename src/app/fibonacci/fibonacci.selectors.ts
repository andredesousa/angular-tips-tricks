import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FibonacciState, stateKey } from './fibonacci.state';

const selectFibonacciState = createFeatureSelector<FibonacciState>(stateKey);

export const selectIsLoading = createSelector(selectFibonacciState, state => state.isLoading);
