<template>
  <div class="navbar">
    <router-link class="navbar__link" to="/">
      <img class="navbar__img" src="../assets/logo.png" alt="Chef hats" />
    </router-link>
    <div>
      <router-link class="navbar__link" to="/categories">
        <button class="btn btn--menu">
          Categories
        </button>
      </router-link>
      <router-link class="navbar__link" to="/random">
        <button class="btn btn--menu">
          Random Recipe
        </button>
      </router-link>
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
  padding 4rem 6rem

  @media only screen and (max-width: 350px)
    padding 4rem

  div > *:last-child
    margin-left 2rem

  &__img
    width 35px
    height 35px
    object-fit cover
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)

  &__link
    position relative
    background #eeeeeeE6
    padding 1rem
    border-radius 10px

    &:hover
      transform translateY(-3px)

.btn--menu
  background-image: linear-gradient(132deg, #F4D03F 0%, #16A085 100%);
  background-clip text
  color transparent
  padding 0

  &:hover
    transform none
</style>
