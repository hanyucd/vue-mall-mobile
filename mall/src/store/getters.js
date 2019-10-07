
const categoryList = state => state.categoryList; // 大分类列表
const locationCity = state => state.locationCity; // 定位城市
const searchHistoryList = state => state.searchHistoryList; // 搜索历史列表
const browseHistoryList = state => state.browseHistoryList; // 浏览历史列表
const userToken = state => state.userToken; // 用户 token
const orderPaymentList = state => state.orderPaymentList; // 订单支付列表 
const addressInfo = state => state.addressInfo; // 地址信息
const tempAddress = state => state.tempAddress; // 临时地址

export default {
  categoryList, // 大分类列表
  searchHistoryList, // 搜索历史列表
  browseHistoryList, // 浏览历史列表
  locationCity, // 定位城市
  userToken, // 用户 token
  orderPaymentList, // 订单支付列表
  addressInfo, // 地址信息
  tempAddress // 临时地址
}