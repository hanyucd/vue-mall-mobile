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
      const resResult = await uActionService.collectionHandle(userId, goodsId, collectionFlag);
      ctx.body = resResult;
    } catch(error) {
      console.log(error);
    }
  }
});

/**
 * 加入到购物车
 */
router.post('/addToShopCart', checkUserStat, async (ctx) => {
  if (ctx.userInfo) {
    const userId = ctx.userInfo.id;
    const { goodsId } = ctx.request.body;
    try {
      const resResult = await uActionService.addToShopCart(userId, goodsId);
      ctx.body = resResult;
    } catch(error) {
      console.log(error);
    }
  }
});

module.exports = router;