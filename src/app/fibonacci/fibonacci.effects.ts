import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

import { generateFibonacci, generateFibonacciSuccess } from './fibonacci.actions';

@Injectable()
export class FibonacciEffects {
  readonly worker = new Worker(new URL('../app.worker', import.meta.url));

  readonly fibonacci$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(generateFibonacci),
        tap(({ value }) => this.worker.postMessage(value)),
      ),
    { dispatch: false },
  );

  readonly fibonacciSuccess$ = createEffect(() =>
    fromEvent<MessageEvent<number>>(this.worker, 'message').pipe(
      map(({ data }) => generateFibonacciSuccess({ value: data })),
    ),
  );

  constructor(private readonly actions$: Actions) {}
}
