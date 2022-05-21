import { ActionTypes, generateFibonacci, generateFibonacciSuccess } from './fibonacci.actions';

describe('Fibonacci actions', () => {
  it(`should create an action ${ActionTypes.GENERATE_FIBONACCI}`, () => {
    const action = generateFibonacci({ value: 1 });

    expect(action).toEqual({
      type: ActionTypes.GENERATE_FIBONACCI,
      value: 1,
    });
  });

  it(`should create an action ${ActionTypes.GENERATE_FIBONACCI_SUCCESS}`, () => {
    const action = generateFibonacciSuccess({ value: 1 });

    expect(action).toEqual({
      type: ActionTypes.GENERATE_FIBONACCI_SUCCESS,
      value: 1,
    });
  });
});
