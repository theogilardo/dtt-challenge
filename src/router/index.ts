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
    path: "/recipe/:id",
    name: "recipe-details",
    component: RecipeDetails,
  },
  {
    path: "/categories",
    name: "recipe-categories",
    component: RecipeCategories,
  },
  {
    path: "/random",
    name: "recipe-random",
    component: RecipeRandom,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
