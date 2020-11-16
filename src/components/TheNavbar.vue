<template>
  <div class="navbar">
    <!-- <router-link class="navbar__logo navbar__link" to="/"> -->
    <router-link class="navbar__link" to="/">
      <img class="navbar__img" src="../assets/logo.png" alt="Chef hats" />
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
  padding 4rem 6rem

  @media only screen and (max-width: 350px)
    padding 4rem

  div > *:last-child
    margin-left 2rem

  // &__logo
  //   width 40px
  //   height 40px
  //   border-radius 50%
  //   background-image: linear-gradient(132deg, #F4D03F 0%, #16A085 100%);
  //   position relative

  &__img
    width 35px
    height 35px
    object-fit cover
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)

  &__link
    color white
    font-weight bold
    position relative
</style>
