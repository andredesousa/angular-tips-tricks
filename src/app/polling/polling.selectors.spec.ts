import { PollingState, initialState, stateKey } from './polling.state';
import { selectIsPolling, selectMessages } from './polling.selectors';

describe('Polling selectors', () => {
  let state: { [stateKey]: PollingState };

  beforeEach(() => {
    state = { polling: initialState };
  });

  it('should return "isPolling" value', () => {
    expect(selectIsPolling(state)).toBe(false);
  });

  it('should return all messages', () => {
    expect(selectMessages(state)).toEqual([]);
  });
});
