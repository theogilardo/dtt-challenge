<template>
  <div class="container">
    <div class="container__header">
      <h1 class="container__header__title">
        Food Recipes <br />
        For You
      </h1>
      <button @click="sortAscendingOrder" class="btn btn--sort">
        Sort A <strong> → </strong> Z
      </button>
      <button @click="sortDescendingOrder" class="btn btn--sort">
        Sort Z <strong> → </strong> A
      </button>
    </div>
    <div class="container__recipes">
      <div class="container__scroll">
        <router-link
          v-for="recipe in recipes"
          :key="recipe.idMeal"
          class="container__recipe"
          :to="{ name: 'recipe-selected', params: { id: recipe.idMeal } }"
          @click.native="storeRecipeSelected(recipe)"
        >
          <img
            :src="recipe.strMealThumb"
            alt="Recipe Photo"
            class="container__recipe__photo"
          />
          <div class="container__recipe__box">
            <h3 class="container__recipe__name">
              {{ recipe.strMeal | reduce }}
            </h3>
            <div class="container__recipe__info">
              <div class="container__recipe__sub-box">
                <img
                  src="../assets/category.svg"
                  alt="Cooking Icon"
                  class="container__recipe__icon"
                />
                <p>{{ recipe.strCategory }}</p>
              </div>
              <div class="container__recipe__sub-box">
                <img
                  src="../assets/flag.svg"
                  alt="Cooking Icon"
                  class="container__recipe__icon"
                />
                <p>{{ recipe.strArea }}</p>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Recipe from "../interface/recipe";

export default Vue.extend({
  name: "TheMenu",
  created() {
    this.$store.dispatch("fetchRecipes");
  },
  computed: {
    recipes(): Recipe[] {
      return this.$store.getters.recipes;
    },
  },
  methods: {
    storeRecipeSelected(recipe: Recipe) {
      this.$store.dispatch("storeRecipeSelected", recipe);
      this.$store.dispatch("storeRecipeRecommendations", recipe);
    },
    sortAscendingOrder() {
      this.$store.commit("sortAscendingOrder");
    },
    sortDescendingOrder() {
      this.$store.commit("sortDescendingOrder");
    },
  },
});
</script>

<style scoped lang="stylus">

.btn--sort
  margin 3rem 1rem 0 1rem

.container
  min-height 100vh
  padding-top 3.5rem

  &__header
    max-width 80rem
    margin 0 auto
    padding 6rem 0 3rem 0

    &__title
      font-family: 'messenger-texture';
      font-size 6rem
      padding 0 2rem

      @media only screen and (max-width: 600px)

        font-size: 5rem
      @media only screen and (max-width: 460px)
        font-size: 4rem

      @media only screen and (max-width: 400px)
        font-size: 3rem

    &__sub-text
      margin-top 2.5rem
      padding 0 15rem
      font-family: 'Montserrat Alternates', sans-serif;

  &__recipes
    position relative
    max-width 120rem
    margin 6rem auto 0 auto

    &::after
      content: "";
      position: absolute;
      z-index: 1;
      top: 0;
      right: 0;
      bottom: 15px;
      background: linear-gradient(90deg, rgba(212,212,212,0) 0%, rgba(255,255,255,0.53125) 51%, rgba(255,255,255,1) 100%);
      width: 10%;
      height 100%

  &__scroll
    display flex
    align-items center
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    position: relative;

    @media only screen and (max-width: 770px)
      overflow-x visible
      overflow-y auto
      flex-direction column

  &__recipe
    position relative
    padding: 3.5rem 1rem;
    margin-bottom 3rem
    height: 25rem;
    flex: 0 0 22rem;
    margin: 0 2rem;
    background: #ffffffb3;
    border-radius: 15px;
    overflow hidden
    text-decoration none
    color #2c3e50
    transition all .4s

    @media only screen and (max-width: 770px)
      width 85%
      flex: 0 0 16rem;
      margin-bottom 2.5rem
      color white
      border: 3px solid white;

    &:hover &__photo
      transform scale(1.1)

    &__photo
      width 10rem
      height 10rem
      border-radius 50%
      object-fit cover
      margin-bottom 1.5rem
      transition all .5s

      @media only screen and (max-width: 770px)
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        border-radius 0
        margin-bottom 0

    &__box
      @media only screen and (max-width: 770px)
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #33333366
        display: flex;
        justify-content: center;
        flex-direction: column;

    &__sub-box
      display flex
      align-items center
      justify-content space-around

    &__icon
      width 2rem
      height 2rem
      margin-right 1rem

    &__name
      margin-bottom 1rem
      border-top: 1px solid #dedede;
      padding-top: 1.5rem;

      @media only screen and (max-width: 770px)
        border-top none
        padding 0 1.5rem

    &__info
      display flex
      align-items center
      justify-content space-around
</style>
