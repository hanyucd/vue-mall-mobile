const Router = require('koa-router');
const userService = require('../service/user');
const tools = require('../utils/tools');
const jwt = require('../utils/jwt');

const router = new Router();

/**
 * 用户注册
 */
router.post('/register', async (ctx) => {
  let { userName, password, mobilePhone, smsCode } = ctx.request.body;
  
  console.log(ctx.session)
  if (!ctx.session.smsCode) return ctx.body = { code: 5010, msg: '验证码已过期' };
  if (ctx.session.smsCode !== smsCode) return ctx.body = { code: 5020, msg: '验证码不正确' };
  
  console.log('session: ', ctx.session.smsCode)
  ctx.body = {
    code: 200,
    userName,
    password,
    mobilePhone,
    smsCode
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
  let clientIp = ctx.request.ip.substr(0, 7) == "::ffff:" ? ctx.request.ip.substr(7) : ctx.request.ip; // 客户端 ip
  let curDate = tools.getCurDate(); // 当前时间
  // console.log('ip:', clientIp)
  // console.log('date:', curDate)
  let args = { mobilePhone, clientIp, curDate };

  try {
    let smsCodeData = await userService.dispatchSMSCode(args);
    if (smsCodeData.code === 200) {
      // 将验证码保存入 session 中
      ctx.session.smsCode = smsCodeData.randomNum;
      ctx.body = smsCodeData;
    }
    // ctx.body = { code: 200, msg: '验证码发送成功' };
  } catch(error) {
    console.log(error);
  }
});

module.exports = router;
