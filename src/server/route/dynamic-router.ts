import { Router, Request, Response } from 'express';
import router from './route';
import logger from '@src/core/logger';

export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

interface RouteConfig {
  method: HttpMethod;
  path: string;
  handler: (req: Request, res: Response) => void;
}

class DynamicRouter {
  private dynamicRouteList: RouteConfig[] = [];
  private router: Router;

  constructor() {
    this.router = router;
  }

  addRoute(httpMethod: HttpMethod, endpoint: string, callback: (req: Request, res: Response) => void): void {
    this.dynamicRouteList.push({
      method: httpMethod,
      path: endpoint,
      handler: callback
    });
  }

  private applyRoute(route: RouteConfig): void {
    if (this.router[route.method]) {
      this.router[route.method](route.path, route.handler);
      logger.info(`Added ${route.method.toUpperCase()} route for ${route.path}`);
    } else {
      console.error(`Invalid HTTP method: ${route.method}`);
    }
  }

  initialize(): void {
    this.dynamicRouteList.forEach((route) => this.applyRoute(route));
    logger.info('Dynamic Routes Created.');
  }
}

export const dynamicRouter = new DynamicRouter();
