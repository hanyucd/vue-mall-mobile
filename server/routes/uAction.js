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

/**
 * 编辑收货地址
 */
router.post('/editAddress', checkUserStat, async (ctx) => {
  if (ctx.userInfo) {
    const userId = ctx.userInfo._id; // 取用户 id
    const { addressInfo } = ctx.request.body; // 地址信息

    try {
      const result = await uActionService.editAddress(userId, addressInfo);
      ctx.body = result;
    } catch (error) {
      console.log(error);
    }
  }
});

/**
 * 删除单个地址
 */
router.post('/delAddress', checkUserStat, async (ctx) => {
  if (ctx.userInfo) {
    const userId = ctx.userInfo._id; // 取用户 id
    const { addressId } = ctx.request.body; // 地址 id
    
    try {
      const result = await uActionService.delAddress(userId, addressId);
      ctx.body = result;
    } catch(error) {
      console.log(error);
    }
  }
});

/**
 * 设置默认地址
 */
router.post('/setDefAddress', checkUserStat, async (ctx) => {
  if (ctx.userInfo) {
    const userId = ctx.userInfo._id; // 取用户 id
    const { addressId } = ctx.request.body; // 地址 id
    
    try {
      const result = await uActionService.setDefAddress(userId, addressId);
      ctx.body = result;
    } catch(error) {
      console.log(error);
    }
  }
});

/**
 * 提交订单处理
 */
router.post('/submitOrder', checkUserStat, async (ctx) => {
  if (ctx.userInfo) {
    const userId = ctx.userInfo._id; // 取用户 id
    const { orderInfo } = ctx.request.body; // 订单信息

    try {
      const result = await uActionService.submitOrderHandle(userId, orderInfo);

      ctx.body = result;
    } catch(error) {
      console.log(error);
    }
  }
});

/**
 * 商品评论
 */
router.post('/goodsComment', checkUserStat, async (ctx) => {
  if (ctx.userInfo) {
    const userId = ctx.userInfo._id; // 取用户 id
    const commentArgs = ctx.request.body; // 评论参数
    try {
      const result = await uActionService.commentGoods(userId, commentArgs);
      
      ctx.body = result;
    } catch (error) {
      console.log(error);
    }
  }
});

module.exports = router;