const baseURL = 'https://www.easy-mock.com/mock/5ae2eeb23fbbf24d8cd7f0b6/SmileVue';
const LOCALURL = 'http://localhost:3000';

export const Url = {
  homeDataApi: baseURL + '/index', // 商城首页所有数据接口
  registerApi: LOCALURL + '/user/register', // 用户注册接口
  loginApi: LOCALURL + '/user/login', // 用户登录接口
  goodsDetailInfoApi: LOCALURL + '/goods/goodsDetailInfo', // 商品信息接口
  categoryListApi: LOCALURL + '/goods/getCategoryList', // 大类信息接口
  categorySubListApi: LOCALURL + '/goods/getCategorySubList', // 子类接口
  goodsListApi: LOCALURL + '/goods/getGoodsList', // 分页获取小类商品信息
  addGoodsToCart: LOCALURL + '/user/addGoodsToCart', // 添加商品到购物车
};