import koaRespond from 'koa-respond';

export default () =>
  koaRespond({
    statusMethods: {
      ok: 200,
      notfound: 404,
      internalServerError: 500
    }
  })