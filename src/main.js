import App from './App'
import Vue from 'vue'
import ElementUI from 'element-ui';

import router from './router'
import store from './store'
import { loadStorage } from './utils/cache.js'

import plugin from '@/assets/common/plugin.js';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(ElementUI,{size:'mini'})
Vue.use(plugin);

Vue.prototype.$loadStorage = loadStorage;
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
