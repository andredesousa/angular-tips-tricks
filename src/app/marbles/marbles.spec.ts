import { Observable, timer, of, interval, throwError, SchedulerLike } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { cold, hot, getTestScheduler } from 'jasmine-marbles';
import { switchMap, map, delay, take, filter, mapTo, mergeMap, concatMap } from 'rxjs/operators';

/**
 * RxJS marble testing allows for a more natural style of testing observables.
 * There are multiple libraries for marble testing but we will use jasmine-marbles
 * in the examples because we will be testing with jasmine,
 * rxjs-marbles is another great implementation that is test framework agnostic.
 *
 * - `-` (dash): indicates a passing of time, you can thing of each dash as 10ms when it comes to your tests;
 * - `a`, `b`, `c`... (characters): each character inside the dash indicates an emission;
 * - `|` (pipes): indicate the completion point of an observable;
 * - `()` (parenthesis): indicate the multiple emission in the same time frame;
 * - `^` (caret): indicates the starting point of a subscription;
 * - `!` (exclamation point): indicates the end point of a subscription;
 * - `#` (pound sign): indicates error;
 *
 * cold(marbles: string, values?: any, error?: any) Subscription starts when test begins.
 * hot(marbles: string, values?: any, error?: any) Behaves like subscription starts at point of caret.
 */

describe('Marble testing basics', () => {
  describe('first example', () => {
    it('should understand marble diagram', () => {
      const source = cold('--');
      const expected = cold('--');

      expect(source).toBeObservable(expected);
    });
  });

  describe('cold observable', () => {
    it('should support basic string values', () => {
      const source = cold('-a-|');
      const expected = cold('-a-|');

      expect(source).toBeObservable(expected);
    });

    it('should support basic values provided as params (number)', () => {
      const source = cold('-a-|', { a: 1 });
      const expected = cold('-a-|', { a: 1 });

      expect(source).toBeObservable(expected);
    });

    it('should support basic values provided as params (object)', () => {
      const source = cold('-a-|', { a: { key: 'value' } });
      const expected = cold('-a-|', { a: { key: 'value' } });

      expect(source).toBeObservable(expected);
    });

    it('should support basic errors', () => {
      const source = cold('--#');
      const expected = cold('--#');

      expect(source).toBeObservable(expected);
    });

    it('should support custom errors', () => {
      const source = cold('--#', null, new Error('Oops!'));
      const expected = cold('--#', null, new Error('Oops!'));

      expect(source).toBeObservable(expected);
    });

    it('should support custom Observable error', () => {
      const source = throwError(new Error('Oops!'));
      const expected = cold('#', null, new Error('Oops!'));

      expect(source).toBeObservable(expected);
    });

    it('should support multiple emission in the same time frame', () => {
      const source = of(1, 2, 3);
      const expected = cold('(abc|)', { a: 1, b: 2, c: 3 });

      expect(source).toBeObservable(expected);
    });
  });

  describe('hot observable', () => {
    it('should support basic hot observable', () => {
      const source = hot('-^a-|', { a: 5 });
      const expected = cold('-a-|', { a: 5 });

      expect(source).toBeObservable(expected);
    });

    it('should support testing subscriptions', () => {
      const source = hot('-a-^b---c-|');
      const expected = cold('-b---c-|');
      const subscription = '^------!';

      expect(source).toBeObservable(expected);
      expect(source).toHaveSubscriptions(subscription);
    });
  });
});

describe('Marble testing operators', () => {
  describe('Map', () => {
    it('should add "1" to each value emitted', () => {
      const values = { a: 1, b: 2, c: 3, x: 2, y: 3, z: 4 };
      const source = cold(  '-a-b-c-|', values);
      const expected = cold('-x-y-z-|', values);
      const result = source.pipe(map(x => x + 1));

      expect(result).toBeObservable(expected);
    });
  });

  describe('MapTo', () => {
    it('should map every value emitted to "surprise!"', () => {
      const values = { a: 1, b: 2, c: 3, x: 'surprise!' };
      const source = cold(  '-a-b-c-|', values);
      const expected = cold('-x-x-x-|', values);
      const result = source.pipe(mapTo('surprise!'));

      expect(result).toBeObservable(expected);
    });
  });

  describe('MergeMap', () => {
    it('should maps to inner observable and flattens', () => {
      const values = { a: 'hello', b: 'world', x: 'hello world' };
      const obs1 = cold(    '-a-------a--|', values);
      const obs2 = cold(    '-b-b-b-|', values);
      const expected = cold('--x-x-x---x-x-x-|', values);
      const result = obs1.pipe(mergeMap(x => obs2.pipe(map(y => x + ' ' + y))));

      expect(result).toBeObservable(expected);
    });
  });

  describe('SwitchMap', () => {
    it('should maps each value to inner observable and flattens', () => {
      const values = { a: 10, b: 30, x: 20, y: 40 };
      const obs1 = cold(    '-a-----a--b-|', values);
      const obs2 = cold(    'a-a-a|', values);
      const expected = cold('-x-x-x-x-xy-y-y|', values);
      const result = obs1.pipe(switchMap(x => obs2.pipe(map(y => x + y))));

      expect(result).toBeObservable(expected);
    });
  });

  describe('ConcatMap', () => {
    it('should maps values to inner observable and emits in order', () => {
      const values = { a: 10, b: 30, x: 20, y: 40 };
      const obs1 = cold(    '-a--------b------ab|', values);
      const obs2 = cold(    'a-a-a|', values);
      const expected = cold('-x-x-x----y-y-y--x-x-xy-y-y|', values);
      const result = obs1.pipe(concatMap(x => obs2.pipe(map(y => x + y))));

      expect(result).toBeObservable(expected);
    });
  });

  describe('Custom operator', () => {
    it('should multiply by "2" each value emitted', () => {
      const fn = map((v: number) => v * 2);
      const inputStream = cold('a|', { a: 5 });
      const expectedStream = cold('b|', { b: 10 });
      const outputStream = inputStream.pipe(fn);

      expect(outputStream).toBeObservable(expectedStream);
    });
  });
});

describe('Marble testing with time', () => {
  describe('Interval', () => {
    it('should keeps only even numbers', () => {
      const source = interval(10, getTestScheduler()).pipe(
        take(10),
        filter(x => x % 2 === 0),
      );
      const expected = cold('-a-b-c-d-e|', { a: 0, b: 2, c: 4, d: 6, e: 8 });

      expect(source).toBeObservable(expected);
    });
  });

  describe('Delay', () => {
    it('should waits 20 frames before receive the value', () => {
      const scheduler = getTestScheduler();
      const source = of('x').pipe(
        delay(20, scheduler),
      );
      const expected = cold('--(a|)', { a: 'x' });

      expect(source).toBeObservable(expected);
    });
  });

  describe('Custom operator', () => {
    function conditionalDelay<T>(value: Observable<T>, time: number, scheduler?: SchedulerLike) {
      return switchMap((isToWait: boolean) => isToWait
        ? timer(time, scheduler).pipe(switchMap(() => value))
        : value);
    }

    it('should the most recent value when a delay is not required', () => {
      const fn = conditionalDelay(of(5), 0, getTestScheduler());
      const inputStream = cold('a|', { a: false });
      const expectedStream = cold('b|', { b: 5 });
      const outputStream = inputStream.pipe(fn);

      expect(outputStream).toBeObservable(expectedStream);
    });

    it('should the most recent value when a delay is required', () => {
      const fn = conditionalDelay(of(5), 50, getTestScheduler());
      const inputStream = cold('a|', { a: true });
      const expectedStream = cold('-----(b|)', { b: 5 });
      const outputStream = inputStream.pipe(fn);

      expect(outputStream).toBeObservable(expectedStream);
    });
  });
});

/**
 * Since RxJS version 6 you can use the testing utils to apply marble testing!
 */

describe('Marble testing with RxJS testing utils', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = getTestScheduler();
  });

  describe('Interval', () => {
    it('should keeps only even numbers', () => {
      testScheduler.run(({ expectObservable }) => {
        const result$ = interval(1, getTestScheduler()).pipe(
          take(10),
          filter(x => x % 2 === 0),
        );

        expectObservable(result$).toBe('-a-b-c-d-e|', { a: 0, b: 2, c: 4, d: 6, e: 8 });
      });
    });
  });

  describe('Delay', () => {
    it('should waits 20 frames before receive the value', () => {
      testScheduler.run(({ expectObservable }) => {
        const result$ = of(2).pipe(
          delay(20)
        );

        expectObservable(result$).toBe('20ms (a|)', { a: 2 });
      });
    });
  });

  describe('Delay and Map', () => {
    it('should waits 2 frames between new values', () => {
      testScheduler.run(({ expectObservable }) => {
        const source$ = cold('a--b--(c|)', { a: 1, b: 2, c: 3 });
        const result$ = source$.pipe(
          delay(2),
          map(x => x + 1)
        );

        expectObservable(result$).toBe('2ms a--b--(c|)', { a: 2, b: 3, c: 4 });
      });
    });
  });
});
