export {};

declare global {
  interface Window {
    dataLayer: {
      push: (event: object) => void;
    };
  }
}
