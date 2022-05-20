import { ActionTypes, appError, ErrorCode } from './error-handler.actions';

describe('Error Handler actions', () => {
  it(`should create an action ${ActionTypes.APP_ERROR}`, () => {
    const action = appError({
      error: {
        code: ErrorCode.INTERNAL_ERROR,
        message: 'Internal App Error',
      },
    });

    expect(action).toEqual({
      type: ActionTypes.APP_ERROR,
      error: {
        code: ErrorCode.INTERNAL_ERROR,
        message: 'Internal App Error',
      },
    });
  });
});
