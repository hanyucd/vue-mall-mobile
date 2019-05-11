const jwt = require('jsonwebtoken');

// 撒盐：加密的时候混淆 | 密钥
const secret = 'vue_mall_mobile';

// 创建 Token
const _createToken = (userId) => {
  return jwt.sign({
    userId,
    exp: Math.floor(Date.now() / 1000) + (60 * 60)
  }, secret);
};

module.exports = {
  secret,
  _createToken
}