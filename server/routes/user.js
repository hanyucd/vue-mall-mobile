const Router = require('koa-router');
const User = require('../models/user');

const router = new Router();

/**
 * 用户注册
 */
router.post('/register', async(ctx) => {
  let body = ctx.request.body;
  let user = new User(body); // 实例

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

/**
 * 用户登录
 */
router.post('/login', async(ctx) => {
  let userName = ctx.request.body.userName;
  let passWord = ctx.request.body.passWord;
  // 实例化 User Model
  let user = new User();

  await User.findOne({ userName }).exec()
    .then(async (userDoc) => {
      if (userDoc) {
        try {
          let result = await user.comparePassword(passWord, userDoc.passWord);
          if (result) {
            ctx.body = {
              code: 200, 
              userName: userDoc.userName,
              message: '登录成功'
            };
          } else {
            ctx.body = { code: 202, message: '密码错误' };
          }
        } catch (error) {
          ctx.body = { code: 500, message: error };
        }
      } else {
        ctx.body = { code: 204, message: '用户名不存在' };
      }
    })
    .catch(error => {
      ctx.body = {
        code: 500,
        message: error
      }
    });
});

module.exports = router;
