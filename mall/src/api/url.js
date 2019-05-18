const baseURL = 'http://localhost:3000';

export const Url = {
  homeDataApi: baseURL + '/home', // 商城首页所有数据接口
  registerApi: baseURL + '/user/register', // 用户注册接口
  loginApi: baseURL + '/user/login', // 用户登录接口
  goodsDetailInfoApi: baseURL + '/goods/goodsDetailInfo', // 商品信息接口
  categoryListApi: baseURL + '/goods/getCategoryList', // 大类信息接口
  categorySubListApi: baseURL + '/goods/getCategorySubList', // 子类接口
  goodsListApi: baseURL + '/goods/getGoodsList', // 分页获取小类商品信息接口
  addGoodsToCartApi: baseURL + '/user/addGoodsToCart', // 添加商品到购物车接口
  cartInfoApi: baseURL + '/user/getCartInfo', // 购物车数据接口
  editGoodsNumApi: baseURL + '/user/editGoodsNum', // 修改商品数量接口
  clearCartApi: baseURL + '/user/clearCart', // 清空购物车接口
};