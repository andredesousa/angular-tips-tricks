import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { ExternalModules } from 'src/environments/environment';

import { AnalyticsEffects } from './analytics/analytics.effects';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FibonacciEffects } from './fibonacci/fibonacci.effects';
import { GlobalErrorHandler } from './error-handler/error-handler.service';
import { RouterSerializer } from './router/router.serializer';
import { reducers } from './app.store';
import { stateKey as router } from './router/router.state';
import { CheckboxComponent } from './forms/checkbox/checkbox.component';
import { PollingEffects } from './polling/polling.effects';

@NgModule({
  declarations: [AppComponent, CheckboxComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    EffectsModule.forRoot([AnalyticsEffects, FibonacciEffects, PollingEffects]),
    FormsModule,
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule.forRoot({
      stateKey: router,
      serializer: RouterSerializer,
    }),
    ExternalModules,
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
