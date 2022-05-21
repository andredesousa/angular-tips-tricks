/**
 * Interface describing the environment model.
 */
export interface IEnvironment {
  analytics: boolean;
  customTrackerId: string;
  pollingInterval: number,
  production: boolean;
}

export const PROD = 'product.com';
export const LOCAL = 'localhost';

/**
 * Returns true when the App is hosted in one of the environments.
 */
export function isEnableTo(...envs: string[]): boolean {
  return envs.some(env => window.location.href.includes(env));
}
