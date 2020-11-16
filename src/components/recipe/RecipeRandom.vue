<template>
  <div>
    <recipe-info :has-shuffle="true"></recipe-info>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import RecipeInfo from "./RecipeInfo.vue";

export default {
  name: "RecipeRandom",
  components: {
    RecipeInfo,
  },
};
</script>

<style lang="stylus" scoped></style>
