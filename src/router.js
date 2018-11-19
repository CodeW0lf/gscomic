import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/comic/:id",
      name: "comic",
      component: Home,
      props: true
    },
    {
      path: "/comic",
      name: "comicDefault",
      component: Home
    },
    {
      path: "*",
      redirect: "/comic"
    }
  ]
});
