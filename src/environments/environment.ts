import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { IEnvironment } from './i.environment';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: IEnvironment = {
  analytics: false,
  customTrackerId: 'GTM-XXXX',
  pollingInterval: 5000,
  production: false,
};

export const ExternalModules = [
  StoreDevtoolsModule.instrument({
    maxAge: 100,
  }),
];
