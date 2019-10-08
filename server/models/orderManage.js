const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 订单管理数据模型
const OrderManageSchema = new Schema({
  userId: String, // 用户 ID
  tel: String, // 收货人电话
  address: String, // 收货地址
  mall_price: Number, // 订单总价
  order_id: String, // 订单 ID
  status: { type: Number, default: 0 }, // 待付款 1，待发货 2，待收货 3，已完成 4
  createAt: { type: String, default: +new Date() }, // 创建时间
  order_list: [
    {
      userId: String, // 用户 ID
      goodsId: String, // 商品 ID
      goods_name: String, // 商品名称
      image_path: String, // 商品图片
      present_price: Number, // 商品价格
      buy_count: Number, // 购买数量
      mall_price: Number, // 单个商品购买总价
      order_id: String, // 订单 ID
      is_comment: { type: Boolean, default: false } // 是否已评论
    }
  ]
});

module.exports = mongoose.model('OrderManage', OrderManageSchema);