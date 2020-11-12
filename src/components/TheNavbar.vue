<template>
  <div class="navbar">
    <div class="navbar__logo">
      <img class="navbar__img" src="../assets/chef.png" alt="Chef hats" />
    </div>
    <router-link to="/">Meals</router-link>
    <router-link to="/categories">Categories</router-link>
    <router-link to="/random-meal">Shuffle Meal</router-link>
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
  top: 0;
  left: 0;
  width: 100%;
  height: 3.5rem;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-around;

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

  & > div > *
    margin: 0 1rem;
    color: black;
    font-weight: 700;
</style>
