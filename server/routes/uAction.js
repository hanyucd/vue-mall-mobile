const Router = require('koa-router');
const uActionService = require('../service/uAction');
const checkUserStat = require('../middleware/checkUserStat');

const router = new Router();

/**
 * 商品收藏、取消行为
 */
router.post('/collection', checkUserStat, async (ctx) => {
  if (ctx.userInfo) {
    const userId = ctx.userInfo.id; // 取用户 id
    const { goodsId, collectionFlag } = ctx.request.body;
    try {
      const resData = await uActionService.collectionHandle(userId, goodsId, collectionFlag);
      ctx.body = resData;
    } catch(error) {
      console.log(error);
    }
  }
});

module.exports = router;