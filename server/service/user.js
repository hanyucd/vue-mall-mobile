const MobilePhoneModel = require('../models/mobilePhone');
const UserModel = require('../models/user');
const CollectionModel = require('../models/collection');
const ShopCartModel = require('../models/shopCart');
const AddressManageModel = require('../models/addressManage');
const OrderManageModel = require('../models/orderManage');
const CommentModel = require('../models/comment');
const mongoose = require('mongoose');
const sendSMSCode = require('../utils/sms');

// “投影” (projection) | 数据库需要返回的数据
const PROJECTION = { _id: 1, userName: 1, gender: 1, avatar: 1, mobilePhone: 1, email: 1, year: 1, month: 1, day: 1 };

class userService {
  /**
   * 发送短信验证码
   * 
   * 同一个 ip，一天只能向手机号码发送 10 次
   */
  async dispatchSMSCode({ mobilePhone, clientIp, curDate }) {
    // console.log('服务:', mobilePhone, clientIp, curDate)
    let smsSendMax = 6; // 设定短信发送限制数
    let ipCountMax = 10; // 设定 ip 数限制数
    let smsCode = ''; // 随机短信验证码 
    let smsCodeLen = 6; // 随机短信验证码长度
    for (let i = 0; i < smsCodeLen; i++) {
      smsCode += Math.floor(Math.random() * 10);
    }
    console.log('random:', smsCode)

    try {
      // 根据当前日期查询到相应文档
      let mobilePhoneDoc = await MobilePhoneModel.findOne({ curDate });
      // 同一天，同一个 ip 文档条数
      let clientIpCount = await MobilePhoneModel.find({ clientIp, curDate }).countDocuments();

      if (mobilePhoneDoc) {
        // 60 秒之后可再次发送 | 限制 60 秒内无法再发送 sms APi
        if (((+new Date() / 1000) - mobilePhoneDoc.sendTimestamp / 1000) < 60) {
          return {
            code: 4010,
            time: 60 - Math.floor(((+new Date() / 1000) - mobilePhoneDoc.sendTimestamp / 1000)),
            msg: '限制 60 秒内无法再发送短信验证码'
          }
        }

        // 说明次数未到到限制，可继续发送
        if (mobilePhoneDoc.sendCount < smsSendMax && clientIpCount < ipCountMax) {
          let sendCount = mobilePhoneDoc.sendCount + 1;
          // 更新单个文档
          await mobilePhoneDoc.updateOne({ _id: mobilePhoneDoc._id }, { sendCount, sendTimestamp: +new Date() });
          // 执行发送短信验证码
          // const data = sendSMSCode(mobilePhone, smsCode);
          switch (data.error_code) {
            case 0:
              return { smsCode, code: 200, msg: '验证码发送成功' };
            case 10012:
              return { smsCode, code: 5000, msg: '没有免费短信了' };
            default:
              return { smsCode, code: 4000, msg: '未知错误' };
          }
        } else {
          return { code: 4020, msg: '当前手机号码发送次数达到上限，明天重试' };
        }

      } else {
        return { smsCode, code: 200, msg: '验证码发送成功' };
        // 执行发送短信验证码
        // const data = sendSMSCode(mobilePhone, smsCode);
        switch (data.error_code) {
          case 0:
            // 创建新文档 | 新增数据
            let mPdoc = await MobilePhoneModel.create({ mobilePhone, clientIp, curDate, sendCount: 1 });
            console.log(mPdoc)
            return { smsCode, code: 200, msg: '验证码发送成功' };
          case 10012:
            return { smsCode, code: 5000, msg: '没有免费短信了' };
          default:
            return { smsCode, code: 4000, msg: '未知错误' };
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 用户账号处理：注册 & 登录
   * @param {Object} 
   * @param {Number} handleFlag 处理标识 1: 登录, 2: 注册
   */
  async accountHandle({ userName, password, mobilePhone }, handleFlag = 1) {
    try {
      const userDoc = await UserModel.findOne({ mobilePhone });

      if (!userDoc) {
        switch (handleFlag) {
          case 1:
            return { code: -1, msg: '账号不存在, 可先注册' };
          case 2:
            // 查询是否已存在同用户名
            const user = await UserModel.findOne({ userName });
            if (user) return { code: 0, msg: '用户名已存在' };
            // 注册账号
            let userEntity = new UserModel({ userName, password, mobilePhone });
            // 保存到数据库中
            let userInfo = await userEntity.save();
            return {
              code: 200,
              _id: userInfo._id,
              userName: userInfo.userName,
              gender: userInfo.gender,
              avatar: userInfo.avatar, 
              mobilePhone: userInfo.mobilePhone,
              email: userInfo.email,
              year: userInfo.year,
              month: userInfo.month,
              day: userInfo.day
            };
        }

      } else {
        switch (handleFlag) {
          case 1:
            // 登录账号
            let result = await userDoc.comparePassword(password, userDoc.password); // 进行密码比对是否一致
            return !result
              ? { code: -2, msg: '密码不正确' }
              : {
                  code: 200,
                  _id: userDoc._id,
                  userName: userDoc.userName,
                  gender: userDoc.gender,
                  avatar: userDoc.avatar, 
                  mobilePhone: userDoc.mobilePhone,
                  email: userDoc.email,
                  year: userDoc.year,
                  month: userDoc.month, 
                  day: userDoc.day
                };
          case 2:
            return (userDoc.mobilePhone === mobilePhone) && { code: 1, msg: '账号已存在, 可直接登录' };
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 更新用户信息
   * @param {String} mobilePhone 用户手机号
   * @param {Object} needUpdateInfo 需要更新的信息
   */
  async updateUserInfo(mobilePhone, needUpdateInfo) {
    try {
      let userDoc = await UserModel.findOne({ mobilePhone });
      if (userDoc) {
        if (needUpdateInfo.userName === userDoc.userName) {
          await UserModel.updateOne({ _id: userDoc._id }, needUpdateInfo); // 更新用户信息
          const newUserInfo = await UserModel.findById({ _id: userDoc._id }, PROJECTION); // 查询用户信息并返回所需数据
          return newUserInfo;
        } else {
          // 查询是否已存在同用户名
          let user = await UserModel.findOne({ userName: needUpdateInfo.userName });
          // 存在，则直接返回
          if (user) return { code: 1, msg: '用户名已存在' };
          // 不存在，可更新数据
          await UserModel.updateOne({ _id: userDoc._id }, needUpdateInfo); // 更新用户信息
          const newUserInfo = await UserModel.findById({ _id: userDoc._id }, PROJECTION); // 查询用户信息并返回所需数据
          return newUserInfo;
        }
      } else {
        return { code: 0, msg: '您还未注册账号' };
      }
    } catch(error) {
      console.log(error);
    }
  }

  /**
   * 查询商品是否已收藏
   * @param {String} userId 用户 Id
   * @param {String} goodsId 商品 Id
   */
  async queryCollection(userId, goodsId) {
    try {
      const collectionDoc = await CollectionModel.findOne({ userId, goodsId });
      return (!collectionDoc) ? { goodsId, status: 0, msg: '未收藏' } : { goodsId, status: 1, msg: '已收藏' };
    } catch(error) {
      console.log(error);
    }
  }

  /**
   * 获取用户已收藏的商品列表
   * @param {String} userId 用户 Id 
   * @param {Number} page 页数  
   * @param {Number} pageSize 一页取几条数据
   * @param {String} skip 跳过的数据条数
   */
  async getCollectionList({ userId, page, pageSize, skip }) {
    const total = await CollectionModel.find({ userId }).countDocuments();
    const collectionList = await CollectionModel.find({ userId }).sort({ createAt: -1 }).skip(skip).limit(pageSize);
    return { total, collectionList, page, code: 200 }
  }

  /**
   * 查询购物车数据
   * @param {String} userId 用户 Id 
   */
  async checkShopCart(userId) {
    try {
      const shopCartList = await ShopCartModel.find({ userId }).sort({ createAt: -1 });
      if (!shopCartList) return { code: 0, msg: '购物车暂无商品' };
      return { shopCartList, code: 200 };
    } catch(error) {
      console.log(error);
    }
  }

  /**
   * 获取地址列表
   * @param {String} userId 用户 Id 
   */
  async getAddressList(userId) {
    try {
      const addressList = await AddressManageModel.find({ userId });
      return { addressList, code: 200 };
    } catch(error) {
      console.log(error);
    }
  }

  /**
   * 获取默认地址
   * @param {String} userId 用户 Id 
   */
  async getDefAddress(userId) {
    try {
      const defAddress = await AddressManageModel.findOne({ userId, isDefault: true });
      if (!defAddress) return { code: 404, msg: '暂无收货地址' };
      return { code: 200, msg: '获取默认地址成功', defAddress };
    } catch(error) {
      console.log(error);
    }
  }

  /**
   * 获取订单列表
   * @param {String} userId 用户 Id 
   */
  async getOrderList(userId) {
    try {
      const orderList = await OrderManageModel.find({ userId });
      return { code: 200, msg: '获取订单列表成功', orderList: orderList.reverse() };
    } catch(error) {
      console.log(error);
    }
  }

  /**
   * 获取订单对应处理数量
   * @param {String} userId 用户 Id 
   */
  async getOrderNum(userId) {
    try {
      const orderList = await OrderManageModel.find({ userId });
      let orderNum = []; // 相应订单数
      let waitPay = []; // 待付款
      let waitSend = []; // 待发货
      let waitTake = []; // 待收货
      let waitComment = []; // 待评论
      orderList.forEach(item => {
        switch (item.status) {
          case 1:
            waitPay.push(item);
            break;
          case 2:
            waitSend.push(item);
            break;
          case 3:
            waitTake.push(item);
            break;
          case 4:
            item.order_list.forEach(value => {
              if (!value.is_comment) waitComment.push(value);
            });
            break;
        }
      });
      orderNum.push(waitPay.length, waitSend.length, waitTake.length, 0, waitComment.length);
      return orderNum;
    } catch(error) {
      console.log(error);
    }
  }

  /**
   * 查询待评论商品列表
   * @param {String} userId 用户 Id 
   */
  async queryWaitCommentList(userId) {
    const status = 4; // 订单已完成状态
    const waitCommentList = []; // 待评论商品列表
    try {
      const waitCommentOrderList = await OrderManageModel.find({ userId, status, 'order_list.is_comment': false });
      waitCommentOrderList.forEach(item => {
        // 查找未评论商品
        item.order_list.forEach(value => {
          if (!value.is_comment) waitCommentList.push(value);
        });
      });
      return waitCommentList;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 查询已评论商品列表
   * @param {String} userId 用户 Id 
   */
  async queryAlreadyCommentList(userId) {
    try {
      // 聚合管道 $lookup 连接操作符 | 用于连接同一个数据库中另一个集合，并获取指定的文档
      const alreadyCommentList = await CommentModel.aggregate([
        {
          $lookup: { from: 'goods', localField: 'goodsId', foreignField: 'id', as: 'goods'}
        }, {
          $match: { comment_user_id: mongoose.Types.ObjectId(userId) }
        }, {
          $sort: { comment_time: -1 }
        }
      ]);
      return alreadyCommentList;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 查询评价详情
   * @param {String} commentId 评价 _id
   */
  async queryCommentDetails(commentId) {
    try {
      const commentList = await CommentModel.aggregate([
        {
          $lookup: { from: 'goods', localField: 'goodsId', foreignField: 'id', as: 'goods'}
        }, {
          $lookup: { from: 'users', localField: 'comment_user_id', foreignField: '_id', as: 'user'}
        }, {
          $match: { _id: mongoose.Types.ObjectId(commentId) }
        }
      ]);

      return commentList[0];
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new userService();