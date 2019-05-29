const RecommendModel = require('../models/recommend');
const GoodsModel = require('../models/goods');

class GoodsService {
  // 查询首页数据
  async getHome() {
    try {
      let homeData = await RecommendModel.find({});
      return homeData;
    } catch (error) {
      console.log(error);
    }
  }

  // 查询商品详情
  async getGoodsDetails(goodsId) {
    try {
      // findOne()：查询找到的第一个文档
      let goods = await GoodsModel.findOne({ id: goodsId });
      return goods;
    } catch (error) {
      console.log(error);
    }
  }

  // 查询商品列表
  async getGoodsList(categorySubId) {
    try {
      let goodsList = await GoodsModel.find({ sub_id: categorySubId });
      return goodsList;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new GoodsService();