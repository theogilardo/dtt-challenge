<template>
  <div class="container">
    <h1>Details</h1>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "RecipeDetails",
  created() {
    console.log(this.$route.params.id);
  },
});
</script>

<style lang="stylus" scoped>

.container
  min-height 100vh
  display flex
  align-items center
  justify-content center
</style>
