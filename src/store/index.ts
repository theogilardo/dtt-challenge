// @ts-nocheck

import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Recipe from "../interface/RecipeApi";
// import category from "../interface/categoryAPI";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recipes: [],
    recipeRandom: null,
    recipeSelected: null,
    recipeRecommendations: null,
    categories: [],
    sortAscending: false,
    sortDescending: false,
  },
  getters: {
    recipes(state) {
      if (!state.sortAscending && !state.sortDescending) return state.recipes;

      if (state.sortAscending)
        return state.recipes.sort((a, b) => (a.strMeal > b.strMeal ? 1 : -1));

      return state.recipes.sort((a, b) => (a.strMeal < b.strMeal ? 1 : -1));
    },
    recipeRandom(state) {
      return state.recipeRandom;
    },
    recipeSelected(state) {
      return state.recipeSelected;
    },
    recipeRecommendations(state) {
      return state.recipeRecommendations;
    },
    categories(state) {
      return state.categories;
    },
  },
  mutations: {
    storeRecipeRandom(state, recipe) {
      state.recipeRandom = recipe;
    },
    storeRecipes(state, recipes) {
      state.recipes = recipes;
    },
    storeRecipeSelected(state, recipe) {
      state.recipeSelected = recipe;
      localStorage.removeItem("recipeSelected");
      localStorage.setItem("recipeSelected", JSON.stringify(recipe));
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
      const recipes: Recipe[] = response.data.meals;

      // For each recipe, reformat the ingredients
      // A for loop is used because we want to iterate exactly 20 times (the maximun number of ingredients per recipe)
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

      commit("storeRecipes", recipes);
    },

    async fetchRandomRecipe({ commit, dispatch }) {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const recipe = response.data.meals[0];
      recipe.ingredients = [];

      // For each recipe, reformat the ingredients
      // A for loop is used because we want to iterate exactly 20 times (the maximun number of ingredients per recipe)
      for (let j = 1; j <= 20; j++) {
        if (recipe[`strIngredient${j}`]) {
          recipe.ingredients.push(
            `${recipe[`strIngredient${j}`]} <strong> ${
              recipe[`strMeasure${j}`]
            }</strong>`
          );
        }
      }

      localStorage.removeItem("recipeRandom");
      localStorage.setItem("recipeRandom", JSON.stringify(recipe));
      commit("storeRecipeRandom", recipe);
      dispatch("storeRecipeRecommendations", recipe);
    },

    async storeRecipeRecommendations({ commit }, recipe) {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${recipe.strCategory}`
      );
      const recommendations = response.data.meals.slice(0, 3);

      commit("storeRecipeRecommendations", recommendations);
      localStorage.removeItem("recipeRecommendations");
      localStorage.setItem(
        "recipeRecommendations",
        JSON.stringify(recommendations)
      );
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
