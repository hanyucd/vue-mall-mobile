import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vant from 'vant';
import { Lazyload } from 'vant';
Vue.use(Lazyload);

import 'vant/lib/index.css';

require('./util/deviceAdapter');

Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
