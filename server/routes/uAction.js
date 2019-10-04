const Router = require('koa-router');
const uActionService = require('../service/uAction');
const checkUserStat = require('../middleware/checkUserStat');

const router = new Router();

/**
 * 商品收藏、取消行为
 */
router.post('/collection', checkUserStat, async (ctx) => {
  if (ctx.userInfo) {
    const userId = ctx.userInfo._id; // 取用户 id
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
    const userId = ctx.userInfo._id; // 取用户 id
    const { goodsId } = ctx.request.body;
    try {
      const resResult = await uActionService.addToShopCart(userId, goodsId);
      ctx.body = resResult;
    } catch(error) {
      console.log(error);
    }
  }
});

/**
 * 编辑商品数量
 */
router.post('/editGoodsCount', checkUserStat, async (ctx) => {
  if (ctx.userInfo) {
    const userId = ctx.userInfo._id; // 取用户 id
    const { goodsId, buyCount, mallPrice } = ctx.request.body;

    try {
      const result = await uActionService.editGoodsCount(userId, goodsId, buyCount, mallPrice);
      ctx.body = result;
    } catch(error) {
      console.log(error);
    }
  }
});

/**
 * 删除购物车商品
 */
router.post('/delCartGoods', checkUserStat, async (ctx) => {
  if (ctx.userInfo) {
    const userId = ctx.userInfo._id; // 取用户 id
    const { delGoodsIds } = ctx.request.body;

    try {
      const result = await uActionService.delCartGoods(userId, delGoodsIds);
      ctx.body = result;
    } catch(error) {
      console.log(error);
    }
  }
});

module.exports = router;