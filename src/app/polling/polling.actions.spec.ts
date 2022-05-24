import { ActionTypes, startPolling, stopPolling, fetchedNewMessage } from './polling.actions';

describe('Polling actions', () => {
  it(`should create an action ${ActionTypes.START_POLLING}`, () => {
    const action = startPolling();

    expect(action).toEqual({ type: ActionTypes.START_POLLING });
  });

  it(`should create an action ${ActionTypes.STOP_POLLING}`, () => {
    const action = stopPolling();

    expect(action).toEqual({ type: ActionTypes.STOP_POLLING });
  });

  it(`should create an action ${ActionTypes.FETCHED_NEW_MESSAGE}`, () => {
    const action = fetchedNewMessage({ message: 'New message from system' });

    expect(action).toEqual({
      type: ActionTypes.FETCHED_NEW_MESSAGE,
      message: 'New message from system',
    });
  });
});
