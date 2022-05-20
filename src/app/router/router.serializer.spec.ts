import { ActivatedRouteSnapshot, Data, Params, RouterStateSnapshot } from '@angular/router';

import { RouterSerializer } from './router.serializer';

describe('Router Serializer', () => {
  const mockedParams: Params = {
    param1: 'value1',
    param2: 'value2',
  };
  const mockedChildParams: Params = {
    childParam1: 'value1',
    childParam2: 'value2',
  };
  const mockedData: Data = {
    data1: 'value1',
    data2: 'value2',
  };
  const mockedChildData: Data = {
    childData1: 'value1',
    childData2: 'value2',
  };
  const root: ActivatedRouteSnapshot = {
    queryParams: {},
    children: [],
    params: mockedParams,
    data: mockedData,
    firstChild: {
      children: [],
      firstChild: null,
      params: mockedChildParams,
      data: mockedChildData,
    },
  } as unknown as ActivatedRouteSnapshot;

  const mergedRouteSerializer: RouterSerializer = new RouterSerializer();

  it('should serialize the input data', () => {
    const input: RouterStateSnapshot = { url: 'this-is-url', root };

    expect(mergedRouteSerializer.serialize(input)).toEqual({
      url: 'this-is-url',
      params: { ...mockedParams, ...mockedChildParams },
      queryParams: {},
      data: { ...mockedData, ...mockedChildData },
    });
  });
});
