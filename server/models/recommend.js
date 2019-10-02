const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 首页数据模型
const RecommendSchema = new Schema({
  advertesPicture: Object,
  buyTime: String,
  category: Array,
  floor1: Array,
  floor2: Array,
  floor3: Array,
  floorName: Object,
  hotGoods: Array,
  recommend: Array,
  sendFee: Object,
  slides: Array,
  meta: {
    createdAt: { type: Date, default: Date.now() }, // 创建数据的时间
    updateAt: { type: Date, default: Date.now() } // 更新这条数据的时间
  }
});

module.exports = mongoose.model('Recommend', RecommendSchema);