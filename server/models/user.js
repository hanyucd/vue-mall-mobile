const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId; //声明 Object 类型

// 创建用户 Schema
const userSchema = new Schema({
  userId: ObjectId, // 主键
  userName: { type: String, unique: true }, // unique 表示唯一
  passWord: String,
  createAt: { type: Date, default: Date.now() },
  lastLoginAt: { type: Date, default: Date.now() }
});

//发布模型
module.exports = mongoose.model('User', userSchema);
