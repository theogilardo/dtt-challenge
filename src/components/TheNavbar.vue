<template>
  <div class="navbar">
    <router-link class="navbar__logo navbar__link" to="/">
      <img class="navbar__img" src="../assets/chef.png" alt="Chef hats" />
    </router-link>
    <div>
      <router-link class="navbar__link" to="/categories"
        >Categories</router-link
      >
      <router-link class="navbar__link" to="/random">Random Recipe</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "TheNavbar",
});
</script>

<style lang="stylus" scoped>

.navbar
  position: fixed;
  z-index: 100;
  top: 10px;
  left: 0;
  width: 100%;
  height: 3.5rem;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding 0 4rem

  div > *:last-child
    margin-left 2rem

  &__logo
    width 30px
    height 30px
    border-radius 50%
    background #EE5354
    position relative

  &__img
    width 15px
    height 15px
    object-fit cover
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)

  &__link
    // color #2c3e50
    color white
    font-weight bold
</style>
