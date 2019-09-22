const Router = require('koa-router');
const UserModel = require('../models/user');
const GoodsModel = require('../models/goods');
const jwt = require('../utils/jwt');

const router = new Router();

/**
 * 用户注册
 */
router.post('/register', async (ctx) => {
  let a = ctx.request.body;
  ctx.body = {
    code: 200,
    r: a
  }
});

module.exports = router;
