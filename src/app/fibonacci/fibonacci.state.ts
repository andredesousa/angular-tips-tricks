
export interface FibonacciState {
  isLoading: boolean;
}

export const initialState: FibonacciState = {
  isLoading: false,
};

export const stateKey = 'fibonacci';
