import router from '../route/route';

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export default class DynamicRouter {
  private dynamicRouteList = [];

  addDynamicRoute(httpMethod, endpoint, callback) {
    this.dynamicRouteList.push({
      method: httpMethod,
      path: endpoint,
      handler: callback
    });
  }

  dynamicRoute = (route) => {
    if (router[route.method]) {
      router[route.method](route.path, route.handler);
    }
  };

  initializeDynamicRoute() {
    for (const route of this.dynamicRouteList) {
      this.dynamicRoute(route);
    }
  }
}
