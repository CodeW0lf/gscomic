import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import vueScrollTo from "vue-scrollto";
import vueTouch from "vue-directive-touch";
import axios from "axios";

import "./assets/main.scss";

if (process.env.NODE_ENV !== "production") {
  Vue.prototype.$axios = axios.create({
    baseURL: "http://localhost:63342/god-slayers-api"
  });
} else {
  Vue.prototype.$axios = axios.create({
    baseURL: "https://www.godslayerscomic.com/api"
  });
}

Vue.config.productionTip = false;
Vue.use(vueScrollTo);
Vue.use(vueTouch);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
