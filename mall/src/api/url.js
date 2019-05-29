// const baseURL = 'http://localhost:3000';
const baseURL = 'http://192.168.2.113:3000';

export const Url = {
  homeDataApi: baseURL + '/api/goods/home', // 商城首页所有数据接口
  goodsDetailsApi: baseURL + '/api/goods/goodsDetails', // 商品详情接口
  goodsListApi: baseURL + '/api/goods/goodsList', // 分类商品列表接口
  
  addGoodsToCartApi: baseURL + '/user/addGoodsToCart', // 添加商品到购物车接口
  cartInfoApi: baseURL + '/user/getCartInfo', // 购物车数据接口
  editGoodsNumApi: baseURL + '/user/editGoodsNum', // 修改商品数量接口
  clearCartApi: baseURL + '/user/clearCart', // 清空购物车接口
};