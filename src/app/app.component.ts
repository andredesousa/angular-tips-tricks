import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { generateFibonacci } from './fibonacci/fibonacci.actions';
import { selectFibonacciNumber, selectIsLoading } from './fibonacci/fibonacci.selectors';
import { startPolling, stopPolling } from './polling/polling.actions';
import { selectIsPolling, selectMessages } from './polling/polling.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly title = 'angular';

  readonly fibonacci$ = this.store.select(selectFibonacciNumber);

  readonly status$ = this.store.select(selectIsPolling);

  readonly messages$ = this.store.select(selectMessages);

  constructor(private readonly store: Store) {}

  generateFibonacci(value: string): void {
    this.store.dispatch(generateFibonacci({ value: Number(value) }));
  }

  startPolling(): void {
    this.store.dispatch(startPolling());
  }

  stopPolling(): void {
    this.store.dispatch(stopPolling());
  }
}
