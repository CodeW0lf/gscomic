import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import vueScrollTo from "vue-scrollto";
import axios from "axios";

import "./assets/main.css";
import store from './store'

if (process.env.NODE_ENV !== "production") {
  Vue.prototype.$axios = axios.create({
    baseURL: "http://localhost:88/"
  });
} else {
  Vue.prototype.$axios = axios.create({
    baseURL: "https://www.godslayerscomic.com/api"
  });
}

Vue.config.productionTip = false;
Vue.use(vueScrollTo);
Vue.directive('scrollTo', scrollTo);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
