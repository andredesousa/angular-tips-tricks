# Angular Tips & Tricks

This project contains tips & Tricks for Angular projects using RxJS, NgRx, Web Workers, Docker, and other stuff.
The examples presented in this project are covered with unit tests.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13 and [Node.js](https://nodejs.org/en/about/releases) version 14.

## Table of Contents

- [State management](#state-management)
- [Web Workers](#web-workers)
- [Polling](#polling)
- [Control Value Accessor](#control-value-accessor)
- [Error Handling](#error-handling)
- [Internationalization](#internationalization)
- [Feature tracking](#feature-tracking)
- [Feature toggle](feature-toggle)
- [Linting and formatting code](#linting-and-formatting-code)
- [Running unit tests](#running-unit-tests)
- [Marble testing](#marble-testing)
- [Healthchecks and metrics](#healthchecks-and-metrics)
- [Build and deployment](#build-and-deployment)
- [Further help](#further-help)

## State management

The state can be local to a component or shared between components.
If the state is used by other components, it's global, otherwise it will be local UI state.
Sharing data between different components (especially with many separated ones) can be really difficult.
[NgRx](https://ngrx.io/) is a state management system that is based on the [Redux](https://redux.js.org/) pattern.
NgRx is mainly for managing global state across an entire application.

**Key concepts:**

- `Actions` describe unique events that are dispatched from components and services.
- State changes are handled by pure functions called `reducers` that take the current state and the latest action to compute a new state.
- `Selectors` are pure functions used to select, derive and compose pieces of state.
- `State` is accessed with the Store, an observable of state and an observer of actions.

**Application data flow:**

- State describes the condition of the app at a specific point in time.
- The UI is rendered based on that state.
- When something happens (such as a user clicking a button), the state is updated based on what occurred.
- The UI re-renders based on the new state.

**Code structure:**

Typical `NgRx` projects organize code by file type and feature modules.
For each feature module, you see the `actions.ts`, `effects.ts`, `reducers.ts`, `selectors.ts` and `state.ts` file under `store` folder.

## Web Workers

[Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) lets you run CPU-intensive computations in a background thread, freeing the main thread to update the user interface.
If you find your application performs a lot of computations, such as generating CAD drawings or doing heavy geometrical calculations, using web workers can help increase your application's performance.
The worker thread can perform tasks without interfering with the user interface.

A worker is an object created using a constructor (e.g. `Worker()`) that runs a named JavaScript file.
You can run whatever code you like inside the worker thread, with some exceptions.
For example, you can't directly manipulate the DOM from inside a worker, or use some default methods and properties of the window object

[Observable Webworker](https://www.npmjs.com/package/observable-webworker) provides the ability to use web workers with RxJS observables.
You can use Web Workers directly in your Angular components.

## Polling

Polling is a technique where you check for fresh data over a given interval by periodically making API requests to a server.
For example, you can use polling if there is data that changes frequently or you need to wait for the server to transition a given state.
Polling is a simple alternative to web sockets or server events.
In this project, you will find an example using RxJS and NgRX.

## Control Value Accessor

[Control Value Accessor](https://angular.io/api/forms/ControlValueAccessor) interface gives us the power to leverage the Angular forms API, and create a connection between it and the DOM element.

```typescript
interface ControlValueAccessor {
  writeValue(value: T): void
  registerOnChange(fn: (value: T) => void): void
  registerOnTouched(fn: (value: T) => void): void
}
```

This interface allows you to create custom form components.

Under the hood, Angular forms module is applying to each native HTML element a built-in Angular directive, which will be responsible for tracking the value of the field, and communicate it back to the parent form.

## Error Handling

Handling errors properly is essential in building a robust application in Angular.
Error handlers provide an opportunity to present friendly information to the user and collect important data for development.
An application that does not handle errors gracefully leaves its users confused and frustrated when the app suddenly breaks without explanation.
One traditional way of handling errors in Angular is to provide an [ErrorHandler](https://angular.io/api/core/ErrorHandler) class.
This class can be extended to create your own global error handler.

## Internationalization

You have the library [ngx-translate](http://www.ngx-translate.com/) for translation your texts.
It lets you define translations for your content in different languages and switch between them easily.
You can either use the `TranslateService`, the `TranslatePipe` or the `TranslateDirective` to get your translation values.
This is how you do it with the pipe:

```html
<div>{{ 'HELLO' | translate:param }}</div>
```

Your translations should be stored in a JSON file. This file looks like this:

```json
{
  "HELLO": "hello {{value}}"
}
```

## Feature tracking

Analytics helps you understand how people use your app, so you can take action to improve their experience.
In order to successfully track the user's most used features, it takes advantage of the use of `actions` from `NgRX`.

By adding a new entry to the configuration file, it is guaranteed that any given action, related to a user action (click, data refresh and others) are automatically tracked.

```typescript
const ANALYTICS_EVENTS = {
  [ROUTER_NAVIGATED]: state => ({
    customTrackerId: environment.customTrackerId,
    event: 'event',
    eventAction: ROUTER_NAVIGATED,
    eventCategory: 'navigated',
    eventLabel: 'router navigated',
  }),
  ...
};
```

This implementation allows to separate the analytics code from the application's code, therefore not polluting the code.

## Feature toggle

A feature toggle is used to hide, enable or disable the feature during runtime.
The technique allows developers to release a version of a product that has unfinished features.
These unfinished features are hidden (toggled) so that they do not appear in the user interface.

You can use the `environment` files and the `isEnableTo` function to enable or disable unfinished features.

```typescript
const environment = {
  production: true,
  unfinishedFeature: isEnableTo(LOCAL, DEV, INT),
  ...
};
```

## Linting and formatting code

Linters are also excellent tools for finding certain classes of bugs, such as those related to variable scope.

Use `npm run lint` to analyze your code.
Many problems can be automatically fixed with `npm run lint:fix`.

Depending on your editor, you may want to add an editor extension to lint and format your code while you type or on-save.

## Running unit tests

Unit tests are responsible for testing of individual methods or classes by supplying input and making sure the output is as expected.

Use `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).
Use `npm run test:watch` to keep executing unit tests in real time while watching for file changes in the background.

If you want to exclude a specific test, simply use `xit()` or `xdescribe()`.
If you want to run a specific test, use `fit()` or `fdescribe()`.
The `x` means exclude and the `f` stands for focused.

You can see the HTML coverage report opening the [index.html](coverage/index.html) file in your web browser.

## Marble testing

[Marble testing](https://rxjs.dev/guide/testing/marble-testing) allows for a more natural style of testing observables.
There are multiple libraries for marble testing but this project used [jasmine-marbles](https://www.npmjs.com/package/jasmine-marbles).

A marble diagram is a string containing special syntax representing events happening over virtual time.
To write a test with marble diagrams you will need to stick to a convention of characters that will help visualize the observable stream:

- `-` (dash): indicates a passing of time, you can thing of each dash as 10ms when it comes to your tests;
- `a`, `b`, `c`... (characters): each character inside the dash indicates an emission;
- `|` (pipes): indicate the completion point of an observable;
- `()` (parenthesis): indicate the multiple emission in the same time frame;
- `^` (caret): indicates the starting point of a subscription;
- `!` (exclamation point): indicates the end point of a subscription;
- `#` (pound sign): indicates error;

These strings are a powerful syntax that will permit you to simulate the passage of time, emit a value, a completion, an error etc.. all that, without creating the observable yourself.

You also have some functions to parse and create observables from your diagrams:

- `cold(marbles: string, values?: any, error?: any)` function: Subscription starts when test begins.
- `hot(marbles: string, values?: any, error?: any)` function: Behaves like subscription starts at point of caret.

## Healthchecks and metrics

In order to verify if a container is healthy and ready to serve traffic, you must expose a `/health` endpoint responding with a HTTP 200 status code.

In order to provide metrics about `nginx`, you must define `stub_status` in your `nginx.conf` file and expose it in `/health` endpoint.

## Build and deployment

Use `npm run build` to build this project. The build artifacts will be stored in the `dist` directory.

In `docker` folder you can find a Dockerfile and [Nginx](https://www.nginx.com/) configuration file.
Use `npm run release` after `build` command to generate the Docker image.
After, you can start the application via:

```bash
docker run -d -p 8080:8080 angular13
```

## Further help

For further reference, please consider the following articles:

- [npm scripts](https://docs.npmjs.com/cli/v8/using-npm/scripts)
- [Speed up your Angular App with Web Workers](https://www.grapecity.com/blogs/speed-up-angular-apps-with-web-workers)
- [Feature Toggles](https://martinfowler.com/articles/feature-toggles.html)
- [NgRx: Patterns and Techniques](https://blog.nrwl.io/ngrx-patterns-and-techniques-f46126e2b1e5)
- [Angular Service Layers](https://blog.angular-university.io/angular-2-redux-ngrx-rxjs/)
- [Interactive diagrams of Rx Observables](https://rxmarbles.com/)
- [Polling using RxJS](https://itnext.io/polling-using-rxjs-b56cd3531815)
- [Polling with NgRx](https://dev.to/komyg/angular-fire-and-forget-polling-with-ngrx-rxjs-and-unit-tests-3ab5)
- [RxJS - Marble Testing](https://dev.to/this-is-learning/rxjs-marble-testing-2gg9)
- [Error Handling with Angular](https://rollbar.com/blog/error-handling-with-angular-8-tips-and-best-practices/)
- [Expecting the Unexpected](https://medium.com/angular-in-depth/expecting-the-unexpected-best-practices-for-error-handling-in-angular-21c3662ef9e4)
- [Angular Application With NGINX and Docker](https://medium.com/bb-tutorials-and-thoughts/how-to-serve-angular-application-with-nginx-and-docker-3af45be5b854)
