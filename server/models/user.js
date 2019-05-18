const mongoose = require('mongoose');
// const bcrypt = require('bcrypt'); // 用于密码哈希的加密算法
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId; //声明 Object 类型
const SALT_WORK_FACTOR = 10; // 定义加密密码计算强度

// 创建用户 Schema
const userSchema = new Schema({
  userId: ObjectId, // 主键
  userName: { type: String, unique: true }, // unique 表示唯一
  passWord: String,
  cart: Array,
  createAt: { type: Date, default: Date.now() },
  lastLoginAt: { type: Date, default: Date.now() }
});

/**
 * 对密码进行加盐
 * 使用 pre 中间件在用户信息存储前执行
 */
userSchema.pre('save', function(next) {
  //进行加密
  // bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
  //   if (err) return next(err);
  //   bcrypt.hash(this.passWord, salt, (err, hash) => {
  //     if (err) return next(err);
  //     this.passWord = hash;
  //     next();
  //   });
  // });
});

/**
 * 密码比对的方法
 * 第一个参数：客户端传递的; 第二个参数：数据库的
 */
userSchema.methods.comparePassword = (_passWrod, passWord) => {
  // return new Promise((resolve, reject) => {
  //   bcrypt.compare(_passWrod, passWord, (error, result) => {
  //     !error ? resolve(result) : reject(error);
  //   });
  // });
};

//发布模型
module.exports = mongoose.model('User', userSchema);
