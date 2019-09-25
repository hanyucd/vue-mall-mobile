const jwt = require('../utils/jwt');

/**
 * 检查用户状态
 */
const checkUserStat = async (ctx, next) => {
  if (!ctx.header['authorization']) {
    ctx.body = { code: 200, msg: '未登录' };
    return;
  }
  // 获取 token
  const token = ctx.header['authorization'].split(' ')[1];
  // 验证 token 结果
  const result = jwt._verify(token);

  console.log(result);
  if (result) {
    switch (result.code) {
      case 401:
        ctx.response.status = 401; // 设置响应状态码
        ctx.body = { msg: '登录状态已过期，请重新登录', ...result }
        break;
      case 200:
        ctx.userInfo = result;
        await next();
        break;
    }
  }
}

module.exports = checkUserStat;