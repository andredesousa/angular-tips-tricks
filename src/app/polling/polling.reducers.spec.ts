import { startPolling, stopPolling, fetchedNewMessage } from './polling.actions';
import { pollingReducer } from './polling.reducers';
import { initialState } from './polling.state';

describe('Polling reducer', () => {
  it('should start polling', () => {
    const action = startPolling();
    const result = pollingReducer(initialState, action);

    expect(result).toEqual({ ...initialState, isPolling: true });
  });

  it('should stop polling', () => {
    const action = stopPolling();
    const result = pollingReducer(initialState, action);

    expect(result).toEqual({ ...initialState, isPolling: false });
  });

  it('should add a message', () => {
    const action = fetchedNewMessage({ message: 'New message from system' });
    const result = pollingReducer(initialState, action);

    expect(result).toEqual({ ...initialState, messages: ['New message from system'] });
  });
});
