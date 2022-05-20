import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { generateFibonacci } from './fibonacci/fibonacci.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly title = 'angular';

  constructor(private readonly store: Store) {}

  fibonacci(): void {
    this.store.dispatch(generateFibonacci({ value: 20 }));
  }
}
