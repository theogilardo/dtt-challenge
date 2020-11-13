import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import TheMenu from "../components/TheMenu.vue";
import RecipeCategories from "../components/recipe/RecipeCategories.vue";
import RecipeRandom from "../components/recipe/RecipeRandom.vue";
import RecipeDetails from "../components/recipe/RecipeDetails.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "TheMenu",
    component: TheMenu,
  },
  {
    path: "/categories",
    name: "RecipeCategories",
    component: RecipeCategories,
  },
  {
    path: "/random",
    name: "RecipeRandom",
    component: RecipeRandom,
  },
  {
    path: "/details",
    name: "RecipeDetails",
    component: RecipeDetails,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
