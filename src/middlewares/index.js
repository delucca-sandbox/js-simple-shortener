import compose from 'koa-compose';
import bodyparser from 'koa-bodyparser';
import koaHealthcheck from 'koa-simple-healthcheck';
import koaRespond from './koa-respond';
import loadRouteFiles from './load-route-files';
import cors from '@koa/cors';

export default async () =>
  compose([
    cors(),
    bodyparser(),
    koaHealthcheck(),
    koaRespond(),
    ...await loadRouteFiles()
  ])
