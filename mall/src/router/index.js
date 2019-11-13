import Vue from 'vue';
import Router from 'vue-router';

const Home = () => import('@/pages/Home'); // 首页
const Category = () => import('@/pages/Category'); // 商品分类
const Cart = () => import('@/pages/Cart'); // 购物车
const User = () => import('@/pages/User'); // 个人中心
const GoodsDetails = () => import('@/pages/GoodsDetails'); // 商品详情
const City = () => import('@/pages/City'); // 城市选择
const Collection = () => import('@/pages/Collection'); // 我的收藏
const BrowseHistory = () => import('@/pages/BrowseHistory'); // 浏览历史
const CommentCenter = () => import('@/pages/CommentCenter'); // 评价中心
const CommentGoods = () => import('@/pages/CommentGoods'); // 评价商品
const CommentDetails = () => import('@/pages/CommentDetails'); // 评价详情
const OrderManage = () => import('@/pages/OrderManage'); // 订单管理
const Login = () => import('@/pages/Login'); // 登录、注册
const OrderPayment = () => import('@/pages/OrderPayment'); // 订单支付
const AddressManage = () => import('@/pages/AddressManage'); // 地址管理
const AddressEdit = () => import('@/pages/AddressEdit'); // 地址编辑

Vue.use(Router);
/**
 * keepAlive 需要缓存的页面
 */
const router =  new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: { name: 'Home' } },
    { path: '/home', name: 'Home', component: Home, meta: { keepAlive: true, index: 1 }}, // 首页
    { path: '/category', name: 'Category', component: Category, meta: { index: 2 } }, // 商品分类
    { path: '/cart', name: 'Cart', component: Cart, meta: { index: 3 } }, // 购物车
    { path: '/me', name: 'Me', component: User, meta: { index: 4 } }, // 个人中心
    { path: '/city', name: 'City', component: City, meta: { keepAlive: true, index: 5 } }, // 城市选择
    { path: '/collection', name: 'Collection', component: Collection, meta: { index: 6 } }, // 我的收藏
    { path: '/browseHistory', name: 'BrowseHistory', component: BrowseHistory, meta: { index: 7 } }, // 浏览历史
    { path: '/orderManage', name: 'OrderManage', component: OrderManage, meta: { index: 8 } }, // 订单管理
    { path: '/commentCenter', name: 'CommentCenter', component: CommentCenter, meta: { index: 9 } }, // 评价中心
    { path: '/commentGoods', name: 'CommentGoods', component: CommentGoods, props: route => ({ goodsId: route.query.goodsId, order_id: route.params.order_id, orderNum: route.params.orderNum }), meta: { index: 10 } }, // 评价商品
    { path: '/commentDetails', name: 'CommentDetails', component: CommentDetails, props: route => ({ commentId: route.query.commentId }), meta: { index: 11 } }, // 评价详情
    { path: '/orderPayment', name: 'OrderPayment', component: OrderPayment, meta: { index: 12 } }, // 订单支付
    { path: '/addressManage', name: 'AddressManage', component: AddressManage, meta: { index: 13 } }, // 地址管理
    { path: '/addressEdit', name: 'AddressEdit', component: AddressEdit, meta: { index: 14 } }, // 地址编辑
    { path: '/goodsDetails', name: 'GoodsDetails', component: GoodsDetails, props: route => ({ goodsId: route.query.goodsId }), meta: { index: 19 } }, // 商品信息
    { path: '/login', name: 'Login', component: Login, meta: { index: 20 } }, // 登录、注册
    { path: '*', redirect: { name: 'Home' } }
  ]
});

const title = {
  Home: '轻松购',
  Category: '商品分类',
  Cart: '购物车',
  Me: '个人中心',
  City: '城市选择',
  GoodsDetails: '商品详情',
  BrowseHistory: '浏览历史',
  Collection: '我的收藏',
  CommentCenter: '评价中心',
  CommentGoods: '评价商品',
  CommentDetails: '评价详情',
  Login: '登录 / 注册',
  OrderPayment: '订单支付',
  AddressManage: '地址管理',
  OrderManage: '订单管理',
  AddressEdit: '地址编辑',
};

// 注册全局导航前置钩子用来拦截导航
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = title[to.name];
  next();
});

export default router;