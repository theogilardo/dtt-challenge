import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import TheHomepage from "../components/TheHomepage.vue";
import RecipeCategories from "../components/recipe/RecipeCategories.vue";
import RecipeInfoRandom from "../components/recipe/RecipeInfoRandom.vue";
import RecipeSelected from "../components/recipe/RecipeInfoSelected.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "TheHomepage",
    component: TheHomepage,
  },
  {
    path: "/recipe/:id",
    name: "recipe-selected",
    component: RecipeSelected,
  },
  {
    path: "/categories",
    name: "recipe-categories",
    component: RecipeCategories,
  },
  {
    path: "/random",
    name: "recipe-random",
    component: RecipeInfoRandom,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
