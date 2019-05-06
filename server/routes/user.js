const Router = require('koa-router');

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = '首页'
});

router.get('/register', async(ctx) => {
  ctx.body = "注册"
});

module.exports = router;
