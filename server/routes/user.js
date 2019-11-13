const Router = require('koa-router');
const userService = require('../service/user');
const checkUserStat = require('../middleware/checkUserStat');
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
  try {
    const userData = await userService.accountHandle(args, 2); // 2: 表示注册处理
    ctx.body = (userData.code === 200)
      ? { code: 200, msg: '注册成功', token: jwt._createToken(userData) }
      : userData;
  } catch(error) {
    console.log(error);
  }
});

/**
 * 用户登录
 */
router.post('/login', async (ctx) => {
  let { mobilePhone , password, verifyCode } = ctx.request.body;
  
  if (!mobilePhone || !password || !verifyCode) return ctx.body = { code: 4020, msg: '请输入完整信息' };
  if (!ctx.session.picCode) return ctx.body = { code: 5010, msg: '验证码已过期' };
  if (ctx.session.picCode.toUpperCase() !== verifyCode.toUpperCase()) return ctx.body = { code: 5020, msg: '验证码不正确' };

  let args = { mobilePhone, password };
  try {
    const userData = await userService.accountHandle(args, 1); // 1: 表示登录处理
    ctx.body = (userData.code === 200)
      ? { code: 200, msg: '登录成功', token: jwt._createToken(userData) }
      : userData;
  } catch(error) {
    console.log(error);
  }
});

/**
 * 发送短信验证码
 */
router.post('/sendSMSCode', async (ctx) => {
  let { mobilePhone } = ctx.request.body; // 手机号码
  const clientIp =  ctx.req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
    ctx.req.connection.remoteAddress || // 判断 connection 的远程 IP
    ctx.req.socket.remoteAddress || // 判断后端的 socket 的 IP
    ctx.req.connection.socket.remoteAddress || '';
  const curDate = tools.getCurDate(); // 当前时间
  // console.log('ip:', clientIp)
  // console.log('date:', curDate)
  let args = { mobilePhone, clientIp, curDate };

  try {
    let smsCodeData = await userService.dispatchSMSCode(args);
    // 将验证码保存入 session 中
    (smsCodeData.code === 200) && (ctx.session.smsCode = smsCodeData.smsCode);
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

/**
 * 获取用户信息
 */
router.get('/userInfo', checkUserStat, async (ctx) => {
  ctx.body = ctx.userInfo ? { code: 200, userInfo: ctx.userInfo  } : { code: 488, msg: '未知错误' };
});

/**
 * 更新用户信息
 */
router.post('/updateUserInfo', checkUserStat, async (ctx) => {
  if (ctx.userInfo) {
    const { mobilePhone } = ctx.userInfo;
    const needUpdateInfo = ctx.request.body;
    try {
      let newUserInfo = await userService.updateUserInfo(mobilePhone, needUpdateInfo);
      ctx.body = (newUserInfo.code === 1 || 0)
        ? newUserInfo
        : { code: 200, msg: "修改成功", token: jwt._createToken(newUserInfo) };
    } catch(error) {
      console.log(error);
    }
  }
});

/**
 * 查询商品是否已收藏
 */
router.post('/queryCollection', checkUserStat, async (ctx) => {
  if (ctx.userInfo) {
    const userId = ctx.userInfo._id; // 取用户 id
    const { goodsId } = ctx.request.body;
    try {
      let queryResut = await userService.queryCollection(userId, goodsId);
      ctx.body = { code: 200, ...queryResut };
    } catch(error) {
      console.log(error);
    }
  }
});

/**
 * 获取用户已收藏的商品列表
 */
router.get('/collectionList', checkUserStat, async (ctx) => {
  if (ctx.userInfo) {
    const userId = ctx.userInfo._id; // 取用户 id
    const page = parseInt(ctx.request.query.page) || 1;
    let pageSize = 10; // 数据条数
    let skip = (page - 1) * pageSize; // 跳过的数据条数 (分页的公式)
    let options = { userId, page, pageSize, skip }; // 整合选项

    try {
      let result = await userService.getCollectionList(options);
      ctx.body = result;
    } catch(error) {
      console.log(error);
    }
  }
});

/**
 * 查询购物车数据
 */
router.get('/checkShopCart', checkUserStat, async (ctx) => {
  if (ctx.userInfo) {
    const userId = ctx.userInfo._id; // 取用户 id
    try {
      const result = await userService.checkShopCart(userId);
      ctx.body = result;
    } catch(error) {
      console.log(error);
    }
  }
});

/**
 * 获取地址列表
 */
router.get('/addressList', checkUserStat, async (ctx) => {
  if (ctx.userInfo) {
    const userId = ctx.userInfo._id; // 取用户 id
    try {
      const result = await userService.getAddressList(userId);
      ctx.body = result;
    } catch(error) {
      console.log(error);
    }
  }
});

/**
 * 获取默认地址
 */
router.get('/defAddress', checkUserStat, async (ctx) => {
  if (ctx.userInfo) {
    const userId = ctx.userInfo._id; // 取用户 id
    try {
      const result = await userService.getDefAddress(userId);
      ctx.body = result;
    } catch(error) {
      console.log(error);
    }
  }
});

/**
 * 获取订单列表
 */
router.get('/orderList', checkUserStat, async (ctx) => {
  if (ctx.userInfo) {
    const userId = ctx.userInfo._id; // 取用户 id
    try {
      const result = await userService.getOrderList(userId);
      ctx.body = result;
    } catch(error) {
      console.log(error);
    }
  }
});

/**
 * 获取订单对应处理数量
 */
router.get('/orderNum', checkUserStat, async (ctx) => {
  if (ctx.userInfo) {
    const userId = ctx.userInfo._id; // 取用户 id
    
    try {
      const result = await userService.getOrderNum(userId);
      ctx.body = {
        code: 200,
        orderNum: result
      }
    } catch (error) {
      console.log(error);
    }
  }
});

/**
 * 查询待评论商品列表
 */
router.get('/waitCommentList', checkUserStat, async (ctx) => {
  if (ctx.userInfo) {
    const userId = ctx.userInfo._id; // 取用户 id
    
    try {
      const result = await userService.queryWaitCommentList(userId);
      ctx.body = { code: 200, waitCommentList: result };
    } catch (error) {
      console.log(error);
    }
  }
});

/**
 * 查询已评论商品列表
 */
router.get('/alreadyCommentList', checkUserStat, async (ctx) => {
  if (ctx.userInfo) {
    const userId = ctx.userInfo._id; // 取用户 id
    
    try {
      const result = await userService.queryAlreadyCommentList(userId);
      ctx.body = { code: 200, alreadyCommentList: result };
    } catch (error) {
      console.log(error);
    }
  }
});

/**
 * 查询评价详情
 */
router.post('/commentDetails', checkUserStat, async (ctx) => {
  if (ctx.userInfo) {
    const { commentId } = ctx.request.body;
    
    try {
      const result = await userService.queryCommentDetails(commentId);
      ctx.body = { code: 200, commentDetails: result };
    } catch (error) {
      console.log(error);
    }
  }
});

module.exports = router;
