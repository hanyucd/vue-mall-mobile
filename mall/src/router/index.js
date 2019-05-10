import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = () => import('@/pages/Home');
const Register = () => import('@/pages/Register');
const Login = () => import('@/pages/Login');
const GoodsInfo = () => import('@/pages/GoodsInfo');
const CategoryList = () => import('@/pages/CategoryList');
const Cart = () => import('@/pages/Cart');

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', redirect: { name: 'Home' } },
    { path: '/index', name: 'Home', component: Home },
    { path: '/register', name: 'Register', component: Register },
    { path: '/login', name: 'Login', component: Login },
    { path: '/goodsInfo/:goodsId', name: 'GoodsInfo', component: GoodsInfo },
    { path: '/categoryList', name: 'CategoryList', component: CategoryList },
    { path: '/cart', name: 'Cart', component: Cart },
  ]
});