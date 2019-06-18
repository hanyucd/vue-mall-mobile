import Vue from 'vue';
import Router from 'vue-router';

const Home = () => import('@/pages/Home'); // 首页
const Category = () => import('@/pages/Category'); // 商品分类
const Cart = () => import('@/pages/Cart'); // 购物车
const User = () => import('@/pages/User'); // 个人中心
const GoodsDetails = () => import('@/pages/GoodsDetails'); // 商品详情
const City = () => import('@/pages/City'); // 城市选择

// 定义路由跳转动画
Router.prototype.animateFlag = 0;
Vue.use(Router);
/**
 * keepAlive 需要缓存的页面
 */
const router =  new Router({
  mode: 'history',
  scrollBehavior(to, from ,scrollBehavior) {
    if (to.name === 'City') {
      console.log(to)
    }
    // console.log("to:", to)
    // console.log("from:", from)
    // console.log("scrollBehavior：", scrollBehavior)
  },
  routes: [
    { path: '/', redirect: { name: 'Home' } },
    { path: '/home', name: 'Home', component: Home, meta: { keepAlive: true }}, // 首页
    { path: '/category', name: 'Category', component: Category }, // 商品分类
    { path: '/cart', name: 'Cart', component: Cart, meta: { keepAlive: true } }, // 购物车
    { path: '/me', name: 'Me', component: User }, // 个人中心
    { path: '/city', name: 'City', component: City, meta: { keepAlive: true } }, // 城市选择
    { path: '/goodsDetails', name: 'GoodsDetails', component: GoodsDetails, props: route => ({ goodsId: route.query.goodsId }) }, // 商品信息
    { path: '*', redirect: { name: 'Home' } }
  ]
});

const title = {
  Home: '首页',
  Category: '商品分类',
  Cart: '购物车',
  Me: '个人中心',
  City: '城市选择',
  GoodsDetails: '商品详情',
};

// 注册全局导航前置钩子用来拦截导航
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = title[to.name];
  next();
});

export default router;