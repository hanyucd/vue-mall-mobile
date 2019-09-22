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

/**
 * 发送短信验证码
 */
router.post('/sendSMSCode', async (ctx) => {
  ctx.body = {
    code: 200,
    msg: '发送成功'
  }
});

/**
 * 用户登录
 */
router.post('/login', async (ctx) => {
  ctx.body = {
    code: 200,
    msg: '登录成功'
  }
});

module.exports = router;
