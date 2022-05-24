import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';

import { AppComponent } from './app.component';
import { initialState as fibonacciState, stateKey as fibonacci } from './fibonacci/fibonacci.state';
import { initialState as pollingState, stateKey as polling } from './polling/polling.state';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        provideMockStore({
          initialState: { [fibonacci]: fibonacciState, [polling]: pollingState },
        }),
      ],
    });

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should have the right initial values', () => {
    expect(app.fibonacci$).toBeObservable(cold('a', { a: 0 }));
    expect(app.status$).toBeObservable(cold('a', { a: false }));
    expect(app.messages$).toBeObservable(cold('a', { a: [] }));
  });

  it(`should have as title 'angular app is running!'`, () => {
    expect(app.title).toEqual('angular');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.content span')?.textContent).toContain('angular app is running!');
  });
});
