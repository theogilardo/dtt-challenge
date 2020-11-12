import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recipes: [],
  },
  getters: {
    recipes(state) {
      return state.recipes;
    },
  },
  mutations: {
    storeRecipes(state, recipes) {
      state.recipes = recipes;
    },
  },
  actions: {
    async getRecipes({ commit }) {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v2/9973533/latest.php"
      );
      const recipes = response.data.meals;
      commit("storeRecipes", recipes);
    },
  },
  modules: {},
});
