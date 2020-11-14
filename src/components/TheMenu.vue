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
      <div
        v-for="recipe in recipes"
        :key="recipe.idMeal"
        class="container__recipe"
      >
        <router-link
          :to="{ name: 'recipe-details', params: { id: recipe.idMeal } }"
          @click.native="storeRecipeDetails(recipe)"
          class="container__recipe__link"
        >
          <img
            :src="recipe.strMealThumb"
            alt="Recipe Photo"
            class="container__recipe__photo"
          />
          <h3 class="container__recipe__name">{{ recipe.strMeal }}</h3>
          <div class="container__recipe__info">
            <p>{{ recipe.strArea }}</p>
            <p>{{ recipe.strCategory }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Recipe from "../interface/RecipeApi";

export default Vue.extend({
  name: "Menu",
  created() {
    this.$store.dispatch("fetchRecipes");
  },
  computed: {
    recipes() {
      return this.$store.getters.recipes;
    },
  },
  methods: {
    storeRecipeDetails(recipe: Recipe) {
      this.$store.dispatch("storeRecipeRecommendations", recipe);
      this.$store.dispatch("storeRecipeDetails", recipe);
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
  height 100vh
  padding-top 3.5rem

  &__header
    max-width 80rem
    margin 0 auto
    padding 6rem 0 3rem 0

    &__title
      // font-family: 'Paytone One', sans-serif;
      // font-family: 'Abril Fatface', cursive;
      font-family: 'messenger-texture';
      // font-size 8rem
      font-size 6rem

    &__sub-text
      margin-top 2.5rem
      padding 0 15rem
      font-family: 'Montserrat Alternates', sans-serif;
      // font-family: 'Raleway', sans-serif;
      // color: #a9a9a9;

  &__recipes
    max-width 120rem
    padding-top 6rem
    margin 0 auto
    padding-top 3rem
    display flex
    align-items center
    overflow-x auto

  &__recipe
    padding: 3.5rem 1rem;
    margin-bottom 3rem
    height: 25rem;
    flex: 0 0 22rem;
    margin: 0 2rem;
    background: #ffffffb3;
    border-radius: 15px;
    transition all .4s

    &:hover
      transform translateY(-15px)

    &__link
      text-decoration none
      color #2c3e50

    &__photo
      width 10rem
      height 10rem
      border-radius 50%
      object-fit cover
      margin-bottom 1.5rem

    &__name
      margin-bottom 1rem
      border-top: 1px solid #dedede;
      padding-top: 1.5rem;

    &__info
      display flex
      align-items center
      justify-content space-around
</style>
