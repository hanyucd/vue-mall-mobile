// const baseURL = 'http://localhost:3000';

const baseURL = 'http://192.168.1.106:3000'; // 开发使用端口，方便用于真机访问
// const baseURL = 'http://192.168.43.164:3000'; // 真机测试访问

// const baseURL = 'http://132.232.76.126:8000'; // 服务器临时部署端口

export const Url = {
  homeDataApi: baseURL + '/api/goods/home', // 商城首页所有数据接口
  goodsDetailsApi: baseURL + '/api/goods/goodsDetails', // 单个商品详情接口
  goodsListApi: baseURL + '/api/goods/goodsList', // 分类商品列表接口
  searchApi: baseURL + '/api/search', // 搜索接口
  registerApi: baseURL + '/api/user/register', // 注册接口
  

  addGoodsToCartApi: baseURL + '/user/addGoodsToCart', // 添加商品到购物车接口
  cartInfoApi: baseURL + '/user/getCartInfo', // 购物车数据接口
  editGoodsNumApi: baseURL + '/user/editGoodsNum', // 修改商品数量接口
  clearCartApi: baseURL + '/user/clearCart', // 清空购物车接口
};