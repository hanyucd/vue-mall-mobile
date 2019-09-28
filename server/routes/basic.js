const Router = require('koa-router');
const goodsService = require('../service/goods');

const router = new Router();

/**
 * ip 定位城市
 */
router.get('/ipLocation', async (ctx) => {
  const ip = ctx.req.ip;
  const clientIp =  ctx.req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
    ctx.req.connection.remoteAddress || // 判断 connection 的远程 IP
    ctx.req.socket.remoteAddress || // 判断后端的 socket 的 IP
    ctx.req.connection.socket.remoteAddress || ''; 

  console.log(ip, clientIp)
  ctx.body = {
    ip,
    clientIp,
    code: 200,
    city: '北京'
  };
});

/**
 * 根据关键字获取商品数据
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