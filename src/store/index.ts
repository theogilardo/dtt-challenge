// @ts-nocheck

import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Recipe from "../interface/RecipeApi";
// import category from "../interface/categoryAPI";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recipe: null,
    recipeRecommendations: null,
    recipeDetails: null,
    recipes: [],
    categories: [],
    sortAscending: false,
    sortDescending: false,
  },
  getters: {
    recipe(state) {
      return state.recipe;
    },
    recipeDetails(state) {
      return state.recipeDetails;
    },
    recipeRecommendations(state) {
      return state.recipeRecommendations;
    },
    recipes(state) {
      if (!state.sortAscending && !state.sortDescending) return state.recipes;

      if (state.sortAscending)
        return state.recipes.sort((a, b) => (a.strMeal > b.strMeal ? 1 : -1));

      return state.recipes.sort((a, b) => (a.strMeal < b.strMeal ? 1 : -1));
    },
    categories(state) {
      return state.categories;
    },
  },
  mutations: {
    sortAscendingOrder(state) {
      state.sortAscending = true;
      state.sortDescending = false;
    },
    sortDescendingOrder(state) {
      state.sortAscending = false;
      state.sortDescending = true;
    },
    storeRecipe(state, recipe) {
      state.recipe = recipe;
    },
    storeRecipeDetails(state, recipe) {
      state.recipeDetails = recipe;
    },
    storeRecipeRecommendations(state, recommendations) {
      state.recipeRecommendations = recommendations;
    },
    storeRecipes(state, recipes) {
      state.recipes = recipes;
    },
    storeCategories(state, categories) {
      state.categories = categories.slice(0, 9);
    },
  },
  actions: {
    storeRecipeDetails({ commit }, recipe) {
      commit("storeRecipeDetails", recipe);
      localStorage.removeItem("recipeDetails");
      localStorage.setItem("recipeDetails", JSON.stringify(recipe));
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
    async fetchRecipes({ commit }) {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v2/9973533/randomselection.php"
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
    async fetchRandomRecipe({ commit, dispatch }) {
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

      localStorage.removeItem("recipeRandom");
      localStorage.setItem("recipeRandom", JSON.stringify(recipe));
      commit("storeRecipe", recipe);
      dispatch("storeRecipeRecommendations", recipe);
    },
  },
  modules: {},
});
