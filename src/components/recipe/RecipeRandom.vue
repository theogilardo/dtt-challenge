<template>
  <div>
    <recipe-info :has-shuffle="true" :recipe="recipe"></recipe-info>
  </div>
</template>

<script lang="ts">
// @ts-nocheck

import Vue from "vue";
import RecipeInfo from "./RecipeInfo.vue";

export default Vue.extend({
  name: "RecipeRandom",
  components: {
    RecipeInfo,
  },
  created() {
    if (!this.isRecipeInLocalStorage) {
      this.$store.dispatch("fetchRandomRecipe");
    }
  },
  computed: {
    recipe() {
      if (this.isRecipeAvailable) {
        return this.isRecipeAvailable;
      }
      return JSON.parse(localStorage.getItem("recipeRandom"));
    },
    isRecipeAvailable() {
      return this.$store.getters.recipe;
    },
    isRecipeInLocalStorage() {
      return JSON.parse(localStorage.getItem("recipeRandom"));
    },
  },
});
</script>

<style lang="stylus" scoped></style>
