const RecommendModel = require('../models/recommend');

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
}

module.exports = new GoodsService();