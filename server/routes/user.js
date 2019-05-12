const Router = require('koa-router');
const UserModel = require('../models/user');
const GoodsModel = require('../models/goods');
const jwt = require('../utils/jwt');

const router = new Router();

/**
 * 用户注册
 */
router.post('/register', async(ctx) => {
  let body = ctx.request.body;
  let user = new UserModel(body); // 实例

  try {
    let userDoc = await user.save();
    ctx.body = {
      code: 200,
      userName: userDoc.userName,
      token: jwt._createToken(userDoc._id), // 获取 Token
      message: '注册成功'
    };
  } catch (error) {
    ctx.body = {
      code: 500,
      result: error,
      message: '该账号已被注册过'
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
  let user = new UserModel();

  await UserModel.findOne({ userName }).exec()
    .then(async (userDoc) => {
      if (userDoc) {
        try {
          let result = await user.comparePassword(passWord, userDoc.passWord);
          if (result) {
            ctx.body = {
              code: 200, 
              userName: userDoc.userName,
              token: jwt._createToken(userDoc._id), // 获取 Token
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
      ctx.body = { code: 500, message: error };
    });
});

/**
 * 添加商品到购物车
 */
router.post('/addGoodsToCart', async (ctx) => {
  const goodsId = ctx.request.body.goodsId;
  if (ctx.headers.authorization) {
    const token = ctx.headers.authorization.split(' ')[1]; // 获取请求头含有的 token
    const result = jwt._verify(token); // 验证 token 结果
    if (result.code && result.code === 200) {
      // token 验证成功执行
      try {
        let userDoc = await UserModel.findOne({ _id: result.userId }); // 返回 Query 对象
        if (userDoc) {
          // 检查购物车中是否存在将要添加的商品 id
          const goods = userDoc.cart.find(item => item.goodsId === goodsId);
          goods ? goods.count++ : userDoc.cart.push({ goodsId, count: 1 });
          // 更新购物车
          await UserModel.updateOne({ _id: result.userId }, { $set: { cart: userDoc.cart } });
          ctx.body = {
            code: 200,
            message: '商品添加成功'
          };
        } else {
          ctx.body = { code: 404, message: '无此用户' };
        }
      } catch (error) {
        console.log(error);
      }
    } else if (result.code && result.code === 401) {
      // token 验证失败执行 eg: token 失效
      ctx.response.status = 401; // 设置响应状态码
      ctx.body = { code: result.code, message: result.message };
    }
  } else {
    // 需要认证
    ctx.body = { code: 401, message: '需要认证' };
  }
});

/**
 * 获取购物车商品信息
 */
router.get('/getCartInfo', async (ctx) => {
  if (ctx.headers.authorization) {
    const token = ctx.headers.authorization.split(' ')[1]; // 获取请求头含有的 token
    const result = jwt._verify(token); // 验证 token 结果
    if (result.code && result.code === 200) {
      try {
        let userDoc = await UserModel.findOne({ _id: result.userId }); // 返回 Query 对象
        if (userDoc) {
          let cartList = []; // 存储购物车数据
          for (item of userDoc.cart) {
            let goodsDoc = await GoodsModel.findOne({ ID: item.goodsId }); // 查找商品
            cartList.push({ COUNT: item.count, ...goodsDoc._doc });
          }
          ctx.body = { code: 200, result: cartList };
        } else {
          ctx.body = { code: 404, result: [] , message: '无此用户' };
        }
      } catch (error) {
        console.log(error);
      }
    } else if (result.code && result.code === 401) {
      // token 验证失败执行 eg: token 失效
      ctx.response.status = 401; // 设置响应状态码
      ctx.body = { code: result.code, message: result.message };
    }
  } else {
    // 需要认证
    ctx.body = { code: 401, message: '需要认证' };
  }
});

module.exports = router;
