import Koa from 'koa';
import middlewares from './middlewares';
import sentry from './infrastructure/sentry';

const onExecuteGenerator = (port) =>
  () => console.log(`Running on port: ${ port }`);

export default async ({ port }) => {
  const onExecute = onExecuteGenerator(port);
  const api = new Koa();
  const composedMiddleware = await middlewares();

  api.use(composedMiddleware);

  api.on('error', sentry );

  return api.listen(port, onExecute);
}