import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vant from 'vant';
import { Lazyload } from 'vant';
import 'vant/lib/index.css';
import FastClick from 'fastclick';
FastClick.attach(document.body); // 解决移动端点击 300 毫秒延时问题
import '@/assets/css/reset.css';
import '@/assets/css/border.css';
import '@/assets/css/index.css';
import '@/assets/css/icon.styl';
require('./utils/adapter'); // 移动端适配

Vue.use(Lazyload);
Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
