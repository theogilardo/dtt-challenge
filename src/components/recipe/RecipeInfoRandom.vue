<template>
  <div>
    <recipe-info :has-shuffle="true"></recipe-info>
  </div>
</template>

<script lang="ts">
import RecipeInfo from "./RecipeInfo.vue";

export default {
  name: "RecipeInfoRandom",
  components: {
    RecipeInfo,
  },
};
</script>

<style lang="stylus" scoped></style>
