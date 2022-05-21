export const stateKey = 'fibonacci';

export interface FibonacciState {
  isLoading: boolean;
  fibonacciPosition: number;
  fibonacciNumber: number;
}

export const initialState: FibonacciState = {
  isLoading: false,
  fibonacciPosition: 0,
  fibonacciNumber: 0,
};
