import { get, post } from '@/utils/http';
import { Url } from './url';

class Ajax {
  // 获取首页数据 | GET
  getHomeData() {
    return get(Url.homeDataApi);
  }

  // ip 定位城市
  ipLocationCity() {
    return get(Url.ipLocation);
  }

  // 搜索 | POST
  search(keyword, page = 1) {
    return post(Url.searchApi, { keyword, page });
  }

  // 注册 | POST
  register(userName = '', password = '', mobilePhone = '', smsCode = '') {
    return post(Url.registerApi, { userName, password, mobilePhone, smsCode });
  }
  
  // 登录 | POST
  login(mobilePhone = '', password = '', verifyCode = '') {
    return post(Url.loginApi, { mobilePhone, password, verifyCode });
  }
  
  // 发送短信验证码 | POST
  sendSMSCode(mobilePhone) {
    return post(Url.sendSMSCodeApi, { mobilePhone });
  }

  // 发送图形验证码 | GET
  sendPicCode() {
    return Url.sendPicCodeApi;
  }

  // 获取用户信息 | GET
  getUserInfo() {
    return get(Url.userInfoApi);
  }

  // 更新用户信息 | POST
  updateUserInfo(userInfoData) {
    return post(Url.updateUserInfoApi, userInfoData);
  }

  // 获取用户已收藏的商品列表 | GET
  getCollectionList(page = 1) {
    return get(Url.collectionListApi, { page });
  }

  // 获取商品详情 | GET
  getGoodsDetails(goodsId) {
    return get(Url.goodsDetailsApi, { goodsId });
  }

  // 获取分类商品数据 | GET
  getGoodsList(categorySubId) {
    return get(Url.goodsListApi, { categorySubId });
  }

  // 查询商品是否已收藏 | POST
  queryCollection(goodsId) {
    return post(Url.queryCollectionApi, { goodsId });
  }

  // 商品收藏、取消 | POST
  collectionHandle(goodsId, collectionFlag) {
    return post(Url.goodsCollectionApi, { goodsId, collectionFlag });
  }

  // 查询商品是否已收藏 | POST
  addToShopCart(goodsId) {
    return post(Url.addToShopCartApi, { goodsId });
  }

  // 查询购物车数据 | GET
  checkShopCart() {
    return get(Url.checkShopCartApi);
  }
}

export default new Ajax();