import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Recipe from "../interface/RecipeAPI";
import Category from "../interface/categoryAPI";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recipes: [] as Recipe[],
    recipeRandom: {} as Recipe,
    recipeSelected: {} as Recipe,
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
    recipeRandom(state): Recipe {
      return state.recipeRandom;
    },
    recipeSelected(state): Recipe {
      return state.recipeSelected;
    },
    recipeRecommendations(state): Recipe[] {
      return state.recipeRecommendations;
    },
    categories(state): Category[] {
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
      const recipes = response.data.meals;

      // For each recipe, reformat the ingredients
      // A for loop is used because we want to iterate a specific time to reformat the ingredients
      recipes.forEach((recipe: Recipe) => {
        recipe.ingredients = [];

        let numberOfIngredients = 0;

        for (const [key, value] of Object.entries(recipe)) {
          const formattedKey = key.replace(/[0-9]/g, "");
          if (formattedKey === "strIngredient" && value) {
            numberOfIngredients++;
          }
        }

        for (let j = 1; j <= numberOfIngredients; j++) {
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
      const recipe: Recipe = response.data.meals[0];
      recipe.ingredients = [];

      // For each recipe, reformat the ingredients
      // A for loop is used because we want to iterate a specific time to reformat the ingredients
      recipe.ingredients = [];

      let numberOfIngredients = 0;

      for (const [key, value] of Object.entries(recipe)) {
        const formattedKey = key.replace(/[0-9]/g, "");
        if (formattedKey === "strIngredient" && value) {
          numberOfIngredients++;
        }
      }

      for (let j = 1; j <= numberOfIngredients; j++) {
        if (recipe[`strIngredient${j}`]) {
          recipe.ingredients.push(
            `${recipe[`strIngredient${j}`]} <strong> ${
              recipe[`strMeasure${j}`]
            }</strong>`
          );
        }
      }

      console.log("hello");
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

      localStorage.removeItem("recipeRecommendations");
      localStorage.setItem(
        "recipeRecommendations",
        JSON.stringify(recommendations)
      );
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
