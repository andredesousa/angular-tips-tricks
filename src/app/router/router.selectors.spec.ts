import { AppRouterState, stateKey } from './router.state';
import { selectRouterData } from './router.selectors';

describe('Router selectors', () => {
  let mergedRouteReducerState: AppRouterState;
  let state: { [stateKey]: AppRouterState };

  beforeEach(() => {
    mergedRouteReducerState = {
      state: {
        url: '/search/bom',
        params: {},
        queryParams: {},
        data: {},
      },
      navigationId: 2,
    };

    state = {
      router: mergedRouteReducerState,
    };
  });

  it('should select data', () => {
    expect(selectRouterData(state)).toEqual({});
  });
});
