const Router = require('koa-router');

const router = new Router();

/**
 * 收藏商品
 */
router.post('/collection', async (ctx) => {
  ctx.body = { code: 200 };
});

module.exports = router;