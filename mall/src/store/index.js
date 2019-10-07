import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
// Vuex 自带一个日志插件用于一般的调试
import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  strict: debug,
  plugins: debug ? [createLogger()] : []
});