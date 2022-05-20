import { ActivatedRouteSnapshot, Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

import { RouterState } from './router.state';

export class RouterSerializer implements RouterStateSerializer<RouterState> {
  serialize({ root, url }: RouterStateSnapshot): RouterState {
    return {
      url: url,
      params: this.mergeRouteParams(root, route => route.params),
      queryParams: this.mergeRouteParams(root, route => route.queryParams),
      data: this.mergeRouteParams(root, route => route.data),
    };
  }

  private mergeRouteParams(route: ActivatedRouteSnapshot | null, getter: (route: ActivatedRouteSnapshot) => Params): Params {
    if (route) {
      const currentParams = getter(route);
      const primaryChild = route.children.find(child => child.outlet === 'primary') || route.firstChild;

      return { ...currentParams, ...this.mergeRouteParams(primaryChild, getter) };
    }

    return {};
  }
}
