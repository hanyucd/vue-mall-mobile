import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = () => import('@/pages/Home');
const Register = () => import('@/pages/Register');
const Login = () => import('@/pages/Login');
const GoodsInfo = () => import('@/pages/GoodsInfo');
const CategoryList = () => import('@/pages/CategoryList');
const Cart = () => import('@/pages/Cart');

Vue.use(VueRouter);

router


const router =  new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', redirect: { name: 'Home' } },
    { path: '/index', name: 'Home', component: Home }, // 首页
    { path: '/categoryList', name: 'CategoryList', component: CategoryList }, // 商品列表
    { path: '/cart', name: 'Cart', component: Cart, meta: { requiresAuth: true } }, // 购物车
    { path: '/goodsInfo/:goodsId', name: 'GoodsInfo', component: GoodsInfo }, // 商品信息
    { path: '/register', name: 'Register', component: Register }, // 注册
    { path: '/login', name: 'Login', component: Login }, // 登录
  ]
});


// 注册全局导航前置钩子用来拦截导航
// router.beforeEach((to, from, next) => {
//   // 获取 token
//   let token = window.localStorage.getItem('token');
//   // 判断要去的路由有没有 requiresAuth
//   if (to.meta.requiresAuth) {
//     if (token) {
//       next();
//     } else {
//       // 将跳转的路由 path 作为参数，登录成功后跳转到该路由
//       next({ path: '/login', query: to.fullPath });
//     }
//   } else {
//     // 如果不需要权限校验，直接进入路由界面
//     next(); 
//   }
// });

export default router;