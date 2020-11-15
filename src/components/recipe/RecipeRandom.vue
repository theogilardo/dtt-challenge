<template>
  <div>
    <recipe-info :has-shuffle="true"></recipe-info>
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
});
</script>

<style lang="stylus" scoped></style>
