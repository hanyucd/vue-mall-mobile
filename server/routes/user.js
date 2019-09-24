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
  
  if (!userName || !password || !mobilePhone || !smsCode) return ctx.body = { code: 4020, msg: '请输入完整信息' };
  if (!ctx.session.smsCode) return ctx.body = { code: 5010, msg: '验证码已过期' };
  if (ctx.session.smsCode !== smsCode) return ctx.body = { code: 5020, msg: '验证码不正确' };
  
  let args = { userName, password, mobilePhone };
  let userData = await userService.accountHandle(args, true); // true 表示注册处理
  ctx.body = userData;
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
    // 将验证码保存入 session 中
    (smsCodeData.code === 200) && (ctx.session.smsCode = smsCodeData.randomNum);
    ctx.body = smsCodeData;
  } catch(error) {
    console.log(error);
  }
});

/**
 * 发送图片验证码
 */
router.get('/sendPicCode', async (ctx) => {
  let picCode = tools.createCaptcha();
  // 将验证码保存入 session 中
  ctx.session.picCode = picCode.text;
  // 指定返回的类型
  ctx.response.type = 'image/svg+xml';
  ctx.body = picCode.data;
});

module.exports = router;
