import Vue from 'vue';
import Router from 'vue-router';

const Home = () => import('@/pages/Home'); // 首页
const GoodsDetails = () => import('@/pages/GoodsDetails'); // 商品详情
const Category = () => import('@/pages/Category');
const Cart = () => import('@/pages/Cart');
const User = () => import('@/pages/User');
const Register = () => import('@/pages/Register');
const Login = () => import('@/pages/Login');

// 定义路由跳转动画
Router.prototype.animate = 0;
Vue.use(Router);
/**
 * keepAlive 需要缓存的页面
 */
const router =  new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: { name: 'Home' } },
    { path: '/home', name: 'Home', component: Home, meta: { keepAlive: true } }, // 首页
    { path: '/category', name: 'Category', component: Category }, // 商品列表
    { path: '/cart', name: 'Cart', component: Cart }, // 购物车
    { path: '/me', name: 'Me', component: User }, // 个人中心
    { path: '/goodsDetails', name: 'GoodsDetails', component: GoodsDetails, props: route => ({ goodsId: route.query.goodsId }), meta: { keepAlive: true } }, // 商品信息
    // { path: '/register', name: 'Register', component: Register }, // 注册
    // { path: '/login', name: 'Login', component: Login }, // 登录
    { path: '*', redirect: { name: 'Home' } }
  ]
});

const title = {
  Home: '首页',
  Category: '商品分类',
  Cart: '购物车',
  Me: '个人中心',
  GoodsDetails: '商品详情',
  Register: '注册',
  Login: '登录'
};

// 注册全局导航前置钩子用来拦截导航
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = title[to.name];
  next();
});

export default router;