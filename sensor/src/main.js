import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueParticles from 'vue-particles'
import dataV from '@jiaminghi/data-view'

Vue.use(dataV)
Vue.use(ElementUI);
Vue.use(VueParticles)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
