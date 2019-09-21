const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ObjectId = Schema.Types.ObjectId; //声明 Object 类型

// 创建用户 Schema
const userSchema = new Schema({
  userId: ObjectId, // 主键
  userName: { type: String, unique: true }, //  用户名 | unique 表示唯一
  password: String, // 密码
  mobile: String, // 手机号码
  email: String, // 邮箱
  gender: { type: String, default: '男', enum: [ '男', '女', '保密' ] }, // 性别
  avatar: { type: String, default: 'http://img4.imgtn.bdimg.com/it/u=198369807,133263955&fm=27&gp=0.jpg' }, // 头像
  year: { type: Number, default: new Date().getFullYear() },
  month: { type: Number, default: new Date().getMonth() + 1 },
  day: { type: Number, default: new Date().getDate() },
  createAt: { type: Date, default: Date.now() }, // 创建数据的时间
});

//发布模型
module.exports = mongoose.model('User', userSchema);
