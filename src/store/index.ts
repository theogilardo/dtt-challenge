import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Recipe from "../interface/recipe";
import Category from "../interface/category";
import { $helper } from "../utils/helper";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recipes: [] as Recipe[],
    recipeSelected: {} as Recipe,
    recipeRandom: {} as Recipe,
    recipeRecommendations: [] as Recipe[],
    categories: [] as Category[],
    sortAscending: false,
    sortDescending: false,
  },
  getters: {
    recipes(state): Recipe[] {
      if (!state.sortAscending && !state.sortDescending) return state.recipes;

      if (state.sortAscending)
        return state.recipes.sort((a: Recipe, b: Recipe) =>
          a.strMeal > b.strMeal ? 1 : -1
        );

      return state.recipes.sort((a: Recipe, b: Recipe) =>
        a.strMeal < b.strMeal ? 1 : -1
      );
    },
    recipeSelected(state): Recipe {
      return state.recipeSelected;
    },
    recipeRandom(state): Recipe {
      return state.recipeRandom;
    },
    recipeRecommendations(state): Recipe[] {
      return state.recipeRecommendations;
    },
    categories(state): Category[] {
      return state.categories;
    },
  },
  mutations: {
    storeRecipes(state, recipes) {
      state.recipes = recipes;
    },
    storeRecipeSelected(state, recipe) {
      state.recipeSelected = recipe;
    },
    storeRecipeRandom(state, recipe) {
      state.recipeRandom = recipe;
    },
    storeCategories(state, categories) {
      state.categories = categories.slice(0, 9);
    },
    storeRecipeRecommendations(state, recommendations) {
      state.recipeRecommendations = recommendations;
    },
    sortAscendingOrder(state) {
      state.sortAscending = true;
      state.sortDescending = false;
    },
    sortDescendingOrder(state) {
      state.sortAscending = false;
      state.sortDescending = true;
    },
  },
  actions: {
    async fetchRecipes({ commit }) {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v2/9973533/randomselection.php"
      );
      const recipes = response.data.meals;

      recipes.forEach((recipe: Recipe) => {
        $helper.reformatIngredients(recipe);
      });

      commit("storeRecipes", recipes);
    },

    storeRecipeSelected({ commit }, recipe) {
      commit("storeRecipeSelected", recipe);
      $helper.resetLocalStorage("recipeSelected", recipe);
    },

    async fetchRandomRecipe({ commit, dispatch }) {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const recipe: Recipe = response.data.meals[0];

      $helper.reformatIngredients(recipe);
      $helper.resetLocalStorage("recipeRandom", recipe);
      commit("storeRecipeRandom", recipe);
      dispatch("storeRecipeRecommendations", recipe);
    },

    async storeRecipeRecommendations({ commit }, recipe) {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${recipe.strCategory}`
      );
      const recommendations = response.data.meals.slice(0, 3);

      $helper.resetLocalStorage("recipeRecommendations", recommendations);
      commit("storeRecipeRecommendations", recommendations);
    },

    async fetchCategories({ commit }) {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const categories = response.data.categories;
      commit("storeCategories", categories);
    },
  },
});
