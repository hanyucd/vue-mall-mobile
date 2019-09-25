const goodsDetails = state => state.goodsDetails; // 商品详情
const categoryList = state => state.categoryList; // 大分类列表
const locationCity = state => state.locationCity; // 定位城市
const searchHistoryList = state => state.searchHistoryList; // 搜索历史列表
const browseHistoryList = state => state.browseHistoryList; // 浏览历史列表
const token = state => state.token; // token

export default {
  goodsDetails, // 商品详情
  categoryList, // 大分类列表
  searchHistoryList, // 搜索历史列表
  browseHistoryList, // 浏览历史列表
  locationCity, // 定位城市
  token, // token
}