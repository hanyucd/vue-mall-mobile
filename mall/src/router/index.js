import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = () => import('@/pages/Home');

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', redirect: { name: 'Home' } },
    {
      path: '/index', 
      name: 'Home',
      component: Home
    },
  ]
});