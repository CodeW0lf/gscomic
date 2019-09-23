import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Lore from "./views/Lore.vue";
import Sketches from "@/views/Sketches";

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
      path: "/lore",
      name: "lore",
      component: Lore
    },
    {
      path: "/sketches",
      name: "sketches",
      component: Sketches
    },
    {
      path: "/",
      component: Home,
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
