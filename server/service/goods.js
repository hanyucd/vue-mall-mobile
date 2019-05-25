const RecommendModel = require('../models/recommend');
const GoodModel = require('../models/goods');

class GoodsService {
  // 查询首页数据
  async getHome() {
    try {
      let data = await RecommendModel.find({});
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  // 商品详情
  async getGoodsDetails(id) {
    try {
      // findOne()：查询找到的第一个文档
      let goods = await GoodModel.findOne({ id });
      return goods;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new GoodsService();