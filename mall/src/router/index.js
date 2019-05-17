import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = () => import('@/pages/Home');
const Register = () => import('@/pages/Register');
const Login = () => import('@/pages/Login');
const GoodsInfo = () => import('@/pages/GoodsInfo');
const Category = () => import('@/pages/Category');
const Cart = () => import('@/pages/Cart');
const User = () => import('@/pages/User');

Vue.use(VueRouter);

const router =  new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', redirect: { name: 'Home' } },
    { path: '/index', name: 'Home', component: Home }, // 首页
    { path: '/category', name: 'Category', component: Category }, // 商品列表
    { path: '/cart', name: 'Cart', component: Cart }, // 购物车
    { path: '/me', name: 'Me', component: User }, // 个人中心
    { path: '/goodsInfo', name: 'GoodsInfo', component: GoodsInfo }, // 商品信息
    { path: '/register', name: 'Register', component: Register }, // 注册
    { path: '/login', name: 'Login', component: Login }, // 登录
  ]
});

const title = {
  Home: '首页',
  Category: '商品分类',
  Cart: '购物车',
  Me: '个人中心',
  GoodsInfo: '商品详情',
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