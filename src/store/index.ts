import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

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
      const recipes = response.data.meals;
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
      const meal = response.data.meals[0];
      console.log(meal);

      meal.ingredients = [];

      for (let j = 1; j <= 20; j++) {
        if (meal[`strIngredient${j}`]) {
          meal.ingredients.push(
            `${meal[`strIngredient${j}`]} <strong> ${
              meal[`strMeasure${j}`]
            }</strong>`
          );
        } else {
          break;
        }
      }

      console.log(meal);

      commit("storeRecipe", meal);
    },
  },
  modules: {},
});
