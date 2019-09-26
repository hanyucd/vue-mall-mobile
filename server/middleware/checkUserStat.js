const jwt = require('../utils/jwt');

/**
 * 检查用户状态
 */
const checkUserStat = async (ctx, next) => {
  if (!ctx.header['authorization']) {
    // 设置响应状态码 403 Forbidden
    ctx.response.status = 403;
    ctx.body = { code: 403, msg: '未登录' };
    return;
  }
  // 获取 token
  const token = ctx.header['authorization'].split(' ')[1];
  // 验证 token 结果
  const result = jwt._verify(token);

  if (result) {
    switch (result.code) {
      case 401:
        // 设置响应状态码 401： Unauthorized
        ctx.response.status = 401;
        ctx.body = { msg: '登录状态已过期，请重新登录', ...result };
        break;
      case 400:
        // 客户端请求的语法错误 400：Bad Reques
        ctx.response.status = 400;
        ctx.body = { msg: 'Token 错误', ...result };
        break;
      case 200:
        ctx.userInfo = result.userInfo;
        await next();
        break;
    }
  }
}

module.exports = checkUserStat;