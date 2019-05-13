const jwt = require('jsonwebtoken');

// 撒盐：加密的时候混淆 | 密钥
const secret = 'vue_mall_mobile';

// 创建 Token
const _createToken = (userId) => {
  // JWT 格式 token | 有效时间 1 小时
  return jwt.sign({ userId }, secret, { expiresIn: '1h' });
};

// 解码 token (验证 secret 和 检查有效期 exp)
const _verify = (token) => {
  return jwt.verify(token, secret, (error, decoded) => {
    if(error) {
      // token 过期期 eg: { code: 403, name: 'TokenExpiredError', message: 'jwt expired' } | 401 token 过期
      return { code: 401, name: error.name, message: error.message }
    } else {
      // 结果格式 eg： { userId: '5cd7b5159ea7ac253029178d', iat: 1557640469, exp: 1557644069 } | iat（创建的时间戳），exp（到期时间戳）
      return { code: 200, ...decoded };
    }
  });
};

module.exports = {
  secret,
  _createToken,
  _verify
};