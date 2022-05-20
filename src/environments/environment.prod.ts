import { IEnvironment, isEnableTo, PROD } from "./i.environment";

export const environment: IEnvironment = {
  analytics: isEnableTo(PROD),
  customTrackerId: 'GTM-XXXX',
  production: true,
};

export const ExternalModules = [];
