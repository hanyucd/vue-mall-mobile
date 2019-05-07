const Router = require('koa-router');
const User = require('../models/user');

const router = new Router();

/**
 * 用户注册
 */
router.post('/register', async(ctx) => {
  let body = ctx.request.body;
  let user = new User(body);

  try {
    await user.save().then(user => {
      ctx.body = {
        code: 200,
        message: '注册成功'
      };
    });
  } catch (error) {
    ctx.body = {
      code: 500,
      message: error
    };
  }
});

module.exports = router;
