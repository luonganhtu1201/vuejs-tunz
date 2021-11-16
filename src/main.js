import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/vi'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import store from './store'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(ElementUI,{ locale });
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
