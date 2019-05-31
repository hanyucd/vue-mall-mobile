const Router = require('koa-router');
const goodsService = require('../service/goods');
const router = new Router();

/**
 * 根据关键字获取商品数据
 */
router.post('/search', async (ctx) => {
  let { keyword, page = 1 } = ctx.request.body; // 关键字，页数
  let pageSize = 10; // 数据条数
  let skip = (page - 1) * pageSize; // 跳过的数据条数 (分页的公式)
  let options = { keyword, pageSize, skip }; // 整合选项

  try {
    let searchResult = await goodsService.search(options);
    ctx.body = { code: 200, result: searchResult };
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;