<template>
  <div class="container">
    <div v-if="recipe" class="container__recipe">
      <img
        v-if="!areIngredientsActive && !areRecommendationsActive"
        :src="recipe.strMealThumb"
        alt="Recipe Image"
        class="container__recipe__image"
      />
      <div class="container__recipe__right-panel">
        <div
          v-if="areRecommendationsActive"
          class="container__recipe__recommendations"
        >
          <div
            v-for="recipe in recipeRecommendations"
            :key="recipe.idMeal"
            class="container__recipe__recommendation"
          >
            <img
              :src="recipe.strMealThumb"
              class="container__recipe__recommendation__photo"
              alt=""
            />
            <p class="container__recipe__recommendation__name">
              {{ recipe.strMeal }}
            </p>
          </div>
        </div>
        <div v-if="areIngredientsActive" class="container__recipe__ingredients">
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
      <div class="background"></div>
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
      <button v-if="hasShuffle" @click="shuffleRecipe" class="btn btn--shuffle">
        Shuffle
      </button>
      <a
        v-if="hasShuffle"
        @click="shuffleRecipe"
        href="#"
        class="container__recipe__shuffle"
      >
        <img
          class="container__recipe__shuffle__icon"
          src="../../assets/shuffle.svg"
          alt=""
        />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Recipe from "../../interface/recipe";

interface Props {
  hasShuffle: boolean;
}

interface Data {
  areIngredientsActive: boolean;
  areRecommendationsActive: boolean;
}

interface Computed {
  recipe: Recipe;
  recipeRandom: Recipe;
  recipeSelected: Recipe;
  recipeRecommendations: Recipe[];
  isRecipeRandomInLocalStorage: Recipe;
}

interface Methods {
  shuffleRecipe: () => void;
  showIngredients: () => void;
  showRecommendations: () => void;
}

export default Vue.extend<Data, Methods, Computed, Props>({
  name: "RecipeInfo",
  props: {
    hasShuffle: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    if (!this.isRecipeRandomInLocalStorage && this.hasShuffle) {
      this.$store.dispatch("fetchRandomRecipe");
    }
  },
  data() {
    return {
      areIngredientsActive: false,
      areRecommendationsActive: false,
    };
  },
  computed: {
    recipe() {
      return this.hasShuffle ? this.recipeRandom : this.recipeSelected;
    },
    recipeRandom() {
      const recipeRandom = this.$store.getters.recipeRandom;
      return Object.keys(recipeRandom).length
        ? recipeRandom
        : JSON.parse(localStorage.getItem("recipeRandom")!);
    },
    recipeSelected() {
      const recipeSelected = this.$store.getters.recipeSelected;
      return Object.keys(recipeSelected).length
        ? recipeSelected
        : JSON.parse(localStorage.getItem("recipeSelected")!);
    },
    recipeRecommendations() {
      const recipeRecommendations = this.$store.getters.recipeRecommendations;
      return recipeRecommendations.length
        ? recipeRecommendations
        : JSON.parse(localStorage.getItem("recipeRecommendations")!);
    },
    isRecipeRandomInLocalStorage() {
      return JSON.parse(localStorage.getItem("recipeRandom")!);
    },
  },
  methods: {
    shuffleRecipe() {
      this.$store.dispatch("fetchRandomRecipe");
    },
    showIngredients() {
      this.areRecommendationsActive = false;
      this.areIngredientsActive = !this.areIngredientsActive;
    },
    showRecommendations() {
      this.areIngredientsActive = false;
      this.areRecommendationsActive = !this.areRecommendationsActive;
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

  @media only screen and (max-width: 820px)
    color white

  &__recipe
    position relative
    display grid
    grid-template-rows 12rem 4rem 1fr 10rem
    grid-template-columns 1fr 1fr
    height 50rem
    max-width 100rem
    border-radius: 10px
    margin 0 5rem
    overflow: hidden
    background #eeeeeeCC

    @media only screen and (max-width: 820px)
      margin 0 2rem
      height 55rem
      grid-template-rows 14rem 4rem 1fr 10rem

    @media only screen and (max-width: 500px)
      grid-template-rows 15rem 4rem 1fr 10rem

    &__right-panel
      grid-row 1 / 5
      grid-column 2 / 3

      @media only screen and (max-width: 820px)
        position relative
        z-index 10
        grid-column 1 / 3

    &__recommendations
      width 100%
      height 100%
      display flex
      align-items center
      justify-content center
      flex-direction column
      background-image: linear-gradient(132deg, #F4D03FCC 0%, #16A085CC 100%);
      padding 4rem
      color white

    &__recommendation
      border-radius 10px
      overflow hidden
      margin 1rem
      height 11rem
      position relative
      transition all .5s

      &:hover
        transform scale(1.05)

      &__photo
        width 100%
        height 100%
        object-fit cover

      &__name
        position absolute
        background #33333380
        text-transform uppercase
        font-weight bold
        width 100%
        height 100%
        display flex
        align-items center
        justify-content center
        top 50%
        left 50%
        transform translate(-50%, -50%)

    &__ingredients
      width 100%
      height 100%
      padding 8rem 3rem
      display flex
      align-items center
      justify-content center
      background-image: linear-gradient(132deg, #F4D03FCC 0%, #16A085CC 100%);
      color white

      div
        height 100%
        width 100%
        overflow-y auto
        display flex
        align-items center
        justify-content center
        flex-direction column

    &__extra
      grid-row 2 / 3
      grid-column 1 / 2
      width 100%
      display flex
      align-items center
      justify-content space-around
      margin-bottom 3rem

      @media only screen and (max-width: 820px)
        position relative
        z-index 5
        grid-column 1 / 3

      &__subset
        display flex
        align-items center

      &__icon
        width 3rem
        height 2.5rem
        margin-right 1rem

    &__image
      width 100%
      height 100%
      object-fit cover
      grid-row 1 / 5
      grid-column 2 / 3

      @media only screen and (max-width: 820px)
        grid-column 1 / 3

    &__name
      grid-row 1 / 2
      grid-column 1 / 2
      font-size 3rem
      padding 0 3rem
      display flex
      align-items center
      justify-content center
      font-family: 'messenger-texture';

      @media only screen and (max-width: 820px)
        position relative
        z-index 5
        grid-column 1 / 3

    &__info
      position relative
      grid-row 3 / 4
      grid-column 1 / 2
      padding 0 3rem
      display flex
      align-items flex-start
      justify-content center
      overflow-y auto

      @media only screen and (max-width: 820px)
        position relative
        z-index 5
        grid-column 1 / 3

    &__button
      grid-row 4 / 5
      grid-column 1 / 2
      display flex
      align-items center
      justify-content space-around

      @media only screen and (max-width: 820px)
        position relative
        z-index 15
        grid-column 1 / 3

    &__shuffle
      display none
      position absolute
      z-index 10
      top 10px
      right 10px

      @media only screen and (max-width: 820px)
        display block

      &__icon
        width 3rem
        height 3rem
        filter: invert(100%) sepia(12%) saturate(538%) hue-rotate(240deg) brightness(120%) contrast(87%)

.background
  @media only screen and (max-width: 820px)
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #33333380;
    z-index 5
</style>
