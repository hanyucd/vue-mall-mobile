const RecommendModel = require('../models/recommend');

class GoodsService {
  async getHome() {
    try {
      let data = await RecommendModel.find({});
      return data;
    } catch (error) {
      return error;
    }
  }
}

module.exports = new GoodsService();