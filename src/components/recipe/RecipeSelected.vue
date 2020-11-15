<template>
  <div>
    <recipe-info></recipe-info>
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
});
</script>

<style lang="stylus" scoped></style>
