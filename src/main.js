import Vue from 'vue'
import App from './App.vue'
import router from './router'

import vueScrollTo from 'vue-scrollto'

import './assets/css/tailwind.css'
import './assets/css/animate.css'
import store from './store'

Vue.config.productionTip = false
Vue.use(vueScrollTo)
Vue.directive('scrollTo', scrollTo)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
