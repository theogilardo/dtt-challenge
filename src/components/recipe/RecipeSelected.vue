<template>
  <div>
    <recipe-info :recipe="recipe"></recipe-info>
  </div>
</template>

<script lang="ts">
// @ts-nocheck

import Vue from "vue";
import RecipeInfo from "./RecipeInfo.vue";

export default Vue.extend({
  name: "RecipeSelected",
  components: {
    RecipeInfo,
  },
  computed: {
    recipe() {
      if (this.isRecipeSelectedAvailable) {
        return this.$store.getters.recipeSelected;
      }
      return JSON.parse(localStorage.getItem("recipeSelected"));
    },
    isRecipeSelectedAvailable() {
      return this.$store.getters.recipeSelected;
    },
  },
});
</script>

<style lang="stylus" scoped></style>
