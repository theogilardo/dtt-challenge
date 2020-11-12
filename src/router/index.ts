import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import TheMenu from "../components/TheMenu.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "TheMenu",
    component: TheMenu,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
