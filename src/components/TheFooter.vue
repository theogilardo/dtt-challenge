<template>
  <footer>
    <router-link to="/">Menu</router-link>
    <router-link to="/categories">Categories</router-link>
    <router-link to="/random">Random Recipe</router-link>
  </footer>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style lang="stylus" scoped>

footer
  // position fixed
  // bottom 0
  width 100%
  height 3.5rem
  background #33333380
  color white
  display flex
  align-items center
  justify-content space-around

  & > *
    color white
    font-weight bold
    text-transform uppercase
</style>
