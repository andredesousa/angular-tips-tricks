export const stateKey = 'polling';

export interface PollingState {
  isPolling: boolean;
  messages: string[];
}

export const initialState: PollingState = {
  isPolling: false,
  messages: [],
};
