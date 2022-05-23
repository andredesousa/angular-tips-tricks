import { FibonacciState, initialState, stateKey } from './fibonacci.state';
import { selectFibonacciNumber, selectIsLoading } from './fibonacci.selectors';

describe('Fibonacci selectors', () => {
  let state: { [stateKey]: FibonacciState };

  beforeEach(() => {
    state = { fibonacci: initialState };
  });

  it('should return "isLoading" value', () => {
    expect(selectIsLoading(state)).toBe(false);
  });

  it('should return "fibonacciNumber" value', () => {
    expect(selectFibonacciNumber(state)).toBe(0);
  });
});
