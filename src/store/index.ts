// @ts-nocheck

import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Recipe from "../interface/randomAPI";
// import category from "../interface/categoryAPI";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recipe: null,
    recipes: [],
    categories: [],
  },
  getters: {
    recipe(state) {
      return state.recipe;
    },
    recipes(state) {
      return state.recipes;
    },
    categories(state) {
      return state.categories;
    },
  },
  mutations: {
    storeRecipe(state, recipe) {
      state.recipe = recipe;
    },
    storeRecipes(state, recipes) {
      state.recipes = recipes;
    },
    storeCategories(state, categories) {
      state.categories = categories.slice(0, 9);
    },
  },
  actions: {
    async fetchRecipes({ commit }) {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v2/9973533/latest.php"
      );

      const recipes: Recipe[] = response.data.meals;

      // var map: { [key: string]: string } = {};
      console.log(recipes);
      recipes.forEach((recipe: Recipe) => {
        recipe.ingredients = [];
        for (let j = 1; j <= 20; j++) {
          if (recipe[`strIngredient${j}`]) {
            recipe.ingredients.push(
              `${recipe[`strIngredient${j}`]} <strong> ${
                recipe[`strMeasure${j}`]
              }</strong>`
            );
          }
        }
      });

      console.log(recipes);

      commit("storeRecipes", recipes);
    },
    async fetchCategories({ commit }) {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const categories = response.data.categories;
      commit("storeCategories", categories);
    },
    async fetchRandomRecipe({ commit }) {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const recipe = response.data.meals[0];
      console.log(recipe);

      recipe.ingredients = [];

      for (let j = 1; j <= 20; j++) {
        if (recipe[`strIngredient${j}`]) {
          recipe.ingredients.push(
            `${recipe[`strIngredient${j}`]} <strong> ${
              recipe[`strMeasure${j}`]
            }</strong>`
          );
        }
      }

      console.log(recipe);

      commit("storeRecipe", recipe);
    },
  },
  modules: {},
});
