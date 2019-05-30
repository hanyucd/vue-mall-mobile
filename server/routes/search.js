const Router = require('koa-router');

const router = new Router();

router.post('/search', async (ctx) => {
  let { keyword, page } = ctx.request.body;

  ctx.body = { code: 200, result: keyword, page };
});

module.exports = router;