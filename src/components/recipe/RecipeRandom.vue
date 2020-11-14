<template>
  <div class="container">
    <div v-if="recipe" class="container__recipe">
      <div class="container__recipe__right-panel">
        <img
          v-if="!isIngredientsActive"
          :src="recipe.strMealThumb"
          alt="Recipe Image"
          class="container__recipe__image"
        />
        <div v-else class="container__recipe__ingredients">
          <div>
            <p
              v-for="ingredient in recipe.ingredients"
              :key="ingredient.id"
              v-html="ingredient"
              class="container__recipe__ingredient"
            ></p>
          </div>
        </div>
      </div>
      <h2 class="container__recipe__name">{{ recipe.strMeal }}</h2>
      <div class="container__recipe__extra">
        <div class="container__recipe__extra__subset">
          <img
            src="../../assets/category.svg"
            alt="Cooking Icon"
            class="container__recipe__extra__icon"
          />
          <p>{{ recipe.strCategory }}</p>
        </div>
        <div class="container__recipe__extra__subset">
          <img
            src="../../assets/flag.svg"
            alt="Flag icon"
            class="container__recipe__extra__icon"
          />
          <p>{{ recipe.strArea }}</p>
        </div>
      </div>
      <p class="container__recipe__info">
        {{ recipe.strInstructions }}
      </p>
      <div class="container__recipe__button">
        <button @click="showIngredients" class="btn btn--ingredients">
          Ingredients
        </button>
        <button @click="showRecommendations" class="btn btn--ingredients">
          Recommendations
        </button>
      </div>
      <button @click="shuffleRecipe" class="btn btn--shuffle">
        Suffle
      </button>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-nocheck

import Vue from "vue";
export default Vue.extend({
  name: "RecipeRandom",
  data() {
    return {
      isIngredientsActive: false,
    };
  },
  created() {
    if (!this.isRecipeInLocalStorage) {
      this.$store.dispatch("fetchRandomRecipe");
    }
  },
  computed: {
    recipe() {
      if (this.isRecipeAvailable) {
        return this.$store.getters.recipe;
      }
      return JSON.parse(localStorage.getItem("recipeRandom"));
    },
    isRecipeInLocalStorage() {
      return JSON.parse(localStorage.getItem("recipeRandom"));
    },
    isRecipeAvailable() {
      return this.$store.getters.recipe;
    },
  },
  methods: {
    shuffleRecipe() {
      this.$store.dispatch("fetchRandomRecipe");
    },
    showIngredients() {
      this.isIngredientsActive = !this.isIngredientsActive;
    },
    showRecommendations() {
      this.isIngredientsActive = !this.isIngredientsActive;
    },
  },
});
</script>

<style lang="stylus" scoped>

.container
  min-height 100vh
  display flex
  align-items center
  justify-content center
  padding-top 10px

  &__recipe
    position relative
    display grid
    grid-template-rows 10rem 4rem 1fr 10rem
    grid-template-columns 1fr 1fr
    height 50rem
    max-width 100rem
    border-radius: 10px;
    overflow: hidden;
    background #eeeeeeCC

    &__right-panel
      grid-row 1 / 5
      grid-column 2 / 3

    &__ingredients
      width 100%
      height 100%
      padding 8rem 3rem
      display flex
      align-items center
      justify-content center
      background #2c3e50
      color white

      div
        height 75%
        width 100%
        overflow-y auto
        display flex
        align-items center
        justify-content flex-start
        flex-direction column

    &__ingredient
      margin-bottom 1rem

    &__extra
      grid-row 2 / 3
      grid-column 1 / 2
      width 100%
      display flex
      align-items center
      justify-content space-around
      margin-bottom 3rem

      &__subset
        display flex
        align-items center

      &__icon
        width 3rem
        height 2.5rem
        filter: invert(35%)sepia(96%) saturate(1254%) hue-rotate(329deg) brightness(95%) contrast(95%);
        margin-right 1rem

    &__image
      width 100%
      height 100%
      object-fit cover

    &__name
      grid-row 1 / 2
      grid-column 1 / 2
      font-size 3rem
      padding 0 3rem
      display flex
      align-items center
      justify-content center
      font-family: 'messenger-texture';

    &__info
      grid-row 3 / 4
      grid-column 1 / 2
      padding 0 3rem
      display flex
      align-items flex-start
      justify-content center
      overflow-y auto

    &__button
      grid-row 4 / 5
      grid-column 1 / 2
      display flex
      align-items center
      justify-content space-around

    .btn--shuffle
      position absolute
      top 10px
      right 10px
      border-radius 0
      border-top-right-radius 10px

    .btn--ingredients
      color #ee5354
      border 1.5px solid #ee5354
      background white

      &:hover
        transform translateY(-3px)
</style>
