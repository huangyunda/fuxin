const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const koaBody = require('koa-body')

const routes = require('./router');

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(koaBody({ multipart: true }));
app.use(router.routes()).use(router.allowedMethods());

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.on('error', err => {
  console.log('server error', err)
});

routes.forEach(({ method, fn, path }) => router[method](path, fn));

app.listen(2333);