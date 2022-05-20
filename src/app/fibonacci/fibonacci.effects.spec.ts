import { Actions } from '@ngrx/effects';
import { cold, hot } from 'jasmine-marbles';
import { generateFibonacci } from './fibonacci.actions';
import { FibonacciEffects } from './fibonacci.effects';

describe('Fibonacci effects', () => {
  let actions$: Actions;
  let effects: FibonacciEffects;

  beforeEach(() => {
    actions$ = hot('--a', { a: generateFibonacci({ value: 3 }) });
    effects = new FibonacciEffects(actions$);
  });

  it('should call #postMessage method', () => {
    spyOn(effects.worker, 'postMessage');

    const expected = cold('--a', { a: generateFibonacci({ value: 3 }) });

    expect(effects.fibonacci$).toBeObservable(expected);
    expect(effects.worker.postMessage).toHaveBeenCalledWith(3);
  });
});
