import { FibonacciState, initialState, stateKey } from './fibonacci.state';
import { selectIsLoading } from './fibonacci.selectors';

describe('Fibonacci selectors', () => {
  let state: { [stateKey]: FibonacciState };

  beforeEach(() => {
    state = { fibonacci: initialState };
  });

  it('should return "isLoading" value', () => {
    expect(selectIsLoading(state)).toBe(false);
  });
});
