<template>
  <footer>
    <router-link to="/">Menu</router-link>
    <router-link to="/categories">Categories</router-link>
    <router-link to="/random">Random Recipe</router-link>
  </footer>
</template>

<script lang="ts">
export default {
  name: "TheFooter",
};
</script>

<style lang="stylus" scoped>

footer
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
