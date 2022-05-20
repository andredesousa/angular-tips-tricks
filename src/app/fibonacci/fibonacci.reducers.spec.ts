import { generateFibonacci } from './fibonacci.actions';
import { fibonacciReducer } from './fibonacci.reducers';
import { initialState } from './fibonacci.state';

describe('Fibonacci reducer', () => {
  it('should start loading', () => {
    const action = generateFibonacci({value: 1});
    const result = fibonacciReducer(initialState, action);

    expect(result).toEqual({ ...initialState, isLoading: true });
  });
});
