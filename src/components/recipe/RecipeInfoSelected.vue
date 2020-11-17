<template>
  <div>
    <recipe-info></recipe-info>
  </div>
</template>

<script lang="ts">
import RecipeInfo from "./RecipeInfo.vue";

export default {
  name: "RecipeSelected",
  components: {
    RecipeInfo,
  },
};
</script>

<style lang="stylus" scoped></style>
