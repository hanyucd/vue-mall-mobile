const baseURL = 'http://localhost:3000';
// const baseURL = 'http://192.168.0.112:3000'; // 开发使用端口，方便用于真机访问
// const baseURL = 'http://132.232.76.126:8000'; // 服务器临时部署端口

export const Url = {
  homeDataApi: baseURL + '/api/goods/home', // 商城首页所有数据
  ipLocation: baseURL + '/api/ipLocation', // ip 定位
  searchApi: baseURL + '/api/search', // 搜索
  
  registerApi: baseURL + '/api/user/register', // 用户注册
  loginApi: baseURL + '/api/user/login', // 用户登录
  sendSMSCodeApi: baseURL + '/api/user/sendSMSCode', // 发送短信验证码
  sendPicCodeApi: baseURL + `/api/user/sendPicCode?mt=${ Math.random() }`, // 发送图形验证码
  userInfoApi: baseURL + '/api/user/userInfo', // 用户信息
  updateUserInfoApi: baseURL + '/api/user/updateUserInfo', // 更新用户信息
  collectionListApi: baseURL + '/api/user/collectionList', // 用户收藏列表

  goodsListApi: baseURL + '/api/goods/goodsList', // 分类商品列表
  goodsDetailsApi: baseURL + '/api/goods/goodsDetails', // 单个商品详情
  queryCollectionApi: baseURL + '/api/user/queryCollection', // 查询商品是否已收藏
  goodsCollectionApi: baseURL + '/api/u-action/collection', // 商品收藏、取消
  addToShopCartApi: baseURL + '/api/u-action/addToShopCart', // 加入到购物车
  checkShopCartApi: baseURL + '/api/user/checkShopCart', // 查询购物车数据
  editGoodsCountApi: baseURL + '/api/u-action/editGoodsCount', // 编辑商品数量
  goodsCommentApi: baseURL + '/api/u-action/goodsComment', // 商品评论
  delCartGoodsApi: baseURL + '/api/u-action/delCartGoods', // 删除购物车商品

  addressListApi: baseURL + '/api/user/addressList', // 地址列表
  editAddressApi: baseURL + '/api/u-action/editAddress', // 编辑收货地址
  delAddressApi: baseURL + '/api/u-action/delAddress', // 编辑收货地址
  setDefAddressApi: baseURL + '/api/u-action/setDefAddress', // 设置默认地址
  defAddressApi: baseURL + '/api/user/defAddress', // 默认地址

  submitOrderApi: baseURL + '/api/u-action/submitOrder', // 提交订单
  orderListApi: baseURL + '/api/user/orderList', // 获取订单列表
  orderNumApi: baseURL + '/api/user/orderNum', // 获取订单对应处理数量
  
  waitCommentApi: baseURL + '/api/user/waitCommentList', // 查询待评论商品列表
  alreadyCommentApi: baseURL + '/api/user/alreadyCommentList', // 查询已评论商品列表
  commentDetailsApi: baseURL + '/api/user/commentDetails' // 评论商品详情
};