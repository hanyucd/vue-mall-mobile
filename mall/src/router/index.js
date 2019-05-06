import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = () => import('@/pages/Home');
const Register = () => import('@/pages/Register');

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', redirect: { name: 'Home' } },
    { path: '/register', name: 'Register', component: Register },
    {
      path: '/index', 
      name: 'Home',
      component: Home
    },
  ]
});