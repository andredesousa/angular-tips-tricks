import { generateFibonacci, generateFibonacciSuccess } from './fibonacci.actions';
import { fibonacciReducer } from './fibonacci.reducers';
import { initialState } from './fibonacci.state';

describe('Fibonacci reducer', () => {
  it('should start loading', () => {
    const action = generateFibonacci({ value: 1 });
    const result = fibonacciReducer(initialState, action);

    expect(result).toEqual({ ...initialState, fibonacciPosition: 1, isLoading: true });
  });

  it('should finish loading', () => {
    const action = generateFibonacciSuccess({ value: 1 });
    const result = fibonacciReducer(initialState, action);

    expect(result).toEqual({ ...initialState, fibonacciNumber: 1, isLoading: false });
  });
});
