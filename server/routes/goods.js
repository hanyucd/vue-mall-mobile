const Router = require('koa-router');
const goodsService = require('../service/goods');
const router = new Router();

/**
 * 获取首页商品信息
 */
router.get('/home', async (ctx) => {
  try {
    let data = await goodsService.getHome();
    ctx.body = { code: 200, result: data[0] };
  } catch (error) {
    ctx.body = { code: -1, data: [] };
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
    ctx.body = { code: 200, result: goods };
  } catch(error) {
    ctx.body = { code: 500, message: error }
  }
});

/**
 * 获取商品分类 大类信息的接口
 */
router.get('/getCategoryList', async (ctx) => {
  try {
    let categoryList = await CategoryModel.find({});
    if (categoryList.length > 0) {
      ctx.body = { code: 200, result: categoryList };
    } else {
      ctx.body = { code: 404, message: '未获取到商品大分类' };
    }
  } catch (error) {
    ctx.body = { code: 500, message: error };
  }
});

/**
 * 获取商品子类 分类信息的接口
 */
router.post('/getCategorySubList', async (ctx) => {
  let categoryId = ctx.request.body.categoryId;
  
  try {
    let categorySubList = await CategorySubModel.find({ MALL_CATEGORY_ID: categoryId });
    (categorySubList.length > 0)
      ? ctx.body = { code: 200, result: categorySubList }
      : ctx.body = { code: 404, message: '未获取到商品子分类' };
  } catch (error) {
    ctx.body = { code: 500, message: error };
  }
});

/**
 * 根据商品类别 获取商品信息的接口
 */
router.post('/getGoodsList', async (ctx) => {
  let categorySubId = ctx.request.body.categorySubId;
  let page = ctx.request.body.page; // 页数
  let num = 10; // 每页 10 条数数
  let skip = (page - 1) * num; // 跳过条数

  try {
    let goodsList = await GoodsModel.find({ SUB_ID:categorySubId }).skip(skip).limit(num);
    (goodsList.length > 0)
      ? ctx.body = { code: 200, result: goodsList }
      : ctx.body = { code: 404, message: '未获取到商品数据' };
  } catch (error) {
    ctx.body = { code: 500, message: error };
  }
});

module.exports = router;