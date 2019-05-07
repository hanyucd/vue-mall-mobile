const Router = require('koa-router');

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = '首页'
});

router.post('/register', async(ctx) => {
  console.log(ctx.request.body);
  console.log(ctx);
  ctx.body = ctx.request.body;
});

module.exports = router;
