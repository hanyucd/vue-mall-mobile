const Router = require('koa-router');
const UserModel = require('../models/user');
const GoodsModel = require('../models/goods');
const tools = require('../utils/tools');
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
 * 用户登录
 */
router.post('/login', async (ctx) => {
  ctx.body = {
    code: 200,
    msg: '登录成功'
  }
});

/**
 * 发送短信验证码
 */
router.post('/sendSMSCode', async (ctx) => {
  let { mobilePhone } = ctx.request.body; // 手机号码
  let ip = ctx.request.ip.substr(0, 7) == "::ffff:" ? ctx.request.ip.substr(7) : ctx.request.ip; // 客户端 ip
  let curDate = tools.getCurDate(); // 当前时间
  console.log('ip:', ip)
  console.log('date:', curDate)
  
  ctx.body = {
    code: 200,
    num: mobilePhone,
    msg: '发送成功'
  }
});

module.exports = router;
