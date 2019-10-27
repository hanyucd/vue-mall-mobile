const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 评论列表数据模型
const CommentSchema = new Schema({
  comment_user_id: Schema.Types.ObjectId, // 评论人的 id
  goodsId: String, // 商品 ID
  comment_time: String, // 评论时间
  rate: Number, // 商品评分
  anonymous: Boolean, // 是否匿名评论
  content: { type: String, required: true }, // 评论内容 
  images: Array // 评论图片
});

module.exports = mongoose.model('Comment', CommentSchema);