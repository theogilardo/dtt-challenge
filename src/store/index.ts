import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recipes: [],
    categories: [],
  },
  getters: {
    recipes(state) {
      return state.recipes;
    },
    categories(state) {
      return state.categories;
    },
  },
  mutations: {
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
      console.log(response);
      const categories = response.data.categories;
      console.log(categories);
      commit("storeCategories", categories);
    },
  },
  modules: {},
});
