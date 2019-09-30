const Router = require('koa-router');
const goodsService = require('../service/goods');
const tools = require('../utils/tools');
const router = new Router();

/**
 * ip 定位城市
 */
router.get('/ipLocation', async (ctx) => {
  const clientIp = '42.196.44.48';
  // const clientIp =  ctx.req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
  //   ctx.req.connection.remoteAddress || // 判断 connection 的远程 IP
  //   ctx.req.socket.remoteAddress || // 判断后端的 socket 的 IP
  //   ctx.req.connection.socket.remoteAddress || '';

  try {
    const locationData = await tools.ipLocation(clientIp);

    if (locationData.status !== 0) throw new Error('定位失败');
    
    const locCity = locationData.content.address_detail.city;
    ctx.body = {
      code: 200,
      locationCity: locCity.substring(0, locCity.length - 1)
    };
  } catch(error) {
    ctx.body = { msg: '定位失败', ...error };
    console.log(error);
  }
});

/**
 * 根据关键字搜索商品数据
 */
router.post('/search', async (ctx) => {
  let { keyword, page = 1 } = ctx.request.body; // 关键字，页数
  let pageSize = 10; // 数据条数
  let skip = (page - 1) * pageSize; // 跳过的数据条数 (分页的公式)
  let options = { keyword, page, pageSize, skip }; // 整合选项

  try {
    let searchResult = await goodsService.search(options);
    ctx.body = { code: 200, result: searchResult };
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;