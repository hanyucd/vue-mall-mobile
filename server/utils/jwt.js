const jwt = require('jsonwebtoken');

// 撒盐：加密的时候混淆 | 密钥
const secret = 'vue-mall-mobile';

/**
 * 创建 Token
 */
const _createToken = (userInfo) => {
  // JWT 格式 token | 有效时间 1 小时
  return jwt.sign({ userInfo }, secret, { expiresIn: '1h' });
};

/**
 * 验证 token 结果 (验证 secret 和 检查有效期 exp)
 */
const _verify = (token) => {
  return jwt.verify(token, secret, (error, decoded) => {
    if(error) {
      switch (error.name) {
        // token 过期 eg: { code: 401, name: 'TokenExpiredError', message: 'jwt expired' } | 401 token 过期
        case 'TokenExpiredError':
          return { code: 401, name: error.name, error_msg: error.message }
        // token 错误
        case 'JsonWebTokenError':
          return { code: 400, name: error.name, error_msg: error.message };
        default:
          return error;
      }
    } else {
      // 验证成功 eg：{ userId: '5cd7b5159ea7ac253029178d', iat: 1557640469, exp: 1557644069 } | iat（创建的时间戳），exp（到期时间戳）
      return { code: 200, ...decoded };
    }
  });
};

module.exports = {
  _createToken,
  _verify
};