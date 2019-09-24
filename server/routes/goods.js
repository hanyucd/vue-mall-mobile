const Router = require('koa-router');
const goodsService = require('../service/goods');

const router = new Router();

/**
 * 获取首页商品信息
 */
router.get('/home', async (ctx) => {
  try {
    let homeData = await goodsService.getHome();
    ctx.body = { code: 200, result: homeData[0] };
  } catch (error) {
    ctx.body = { code: -1, result: [] };
    console.log(error);
  }
});

/**
 * 获取商品详细信息
 */
router.get('/goodsDetails', async (ctx) => {
  const { goodsId } = ctx.request.query;

  try {
    let goods = await goodsService.getGoodsDetails(goodsId);
    if (goods) {
      ctx.body = { code: 200, result: goods };
    } else {
      ctx.body = { code: 404, message: '暂无该商品信息' };
    }
  } catch(error) {
    ctx.body = { code: 500, message: error };
  }
});

/**
 * 根据商品子分类 Id 获取商品数据
 */
router.get('/goodsList', async (ctx) => {
  let { categorySubId } = ctx.request.query;

  try {
    let goodsList = await goodsService.getGoodsList(categorySubId);
    ctx.body = { code: 200, result: goodsList };
  } catch (error) {
    ctx.body = { code: 500, message: error };
  }
});

module.exports = router;