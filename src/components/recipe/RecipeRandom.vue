<template>
  <div class="container">
    <div v-if="recipe" class="container__recipe">
      <img
        :src="recipe.strMealThumb"
        alt="Recipe Image"
        class="container__recipe__image"
      />
      <h2 class="container__recipe__name">{{ recipe.strMeal }}</h2>
      <p class="container__recipe__info">
        {{ recipe.strInstructions }}
      </p>
      <div class="container__recipe__ingredients">
        <button @click="fetchIngredients" class="btn btn--ingredients">
          Ingredients
        </button>
      </div>
      <button @click="shuffleRecipe" class="btn btn--shuffle">
        Suffle
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "RecipeRandom",
  created() {
    this.$store.dispatch("fetchRandomRecipe");
  },
  computed: {
    recipe() {
      return this.$store.getters.recipe;
    },
  },
  methods: {
    shuffleRecipe() {
      this.$store.dispatch("fetchRandomRecipe");
    },
    fetchIngredients() {
      this.$store.dispatch("fetchRandomRecipe");
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
    grid-template-rows 10rem 1fr 10rem
    grid-template-columns 1fr 1fr
    height 50rem
    max-width 100rem
    border-radius: 10px;
    overflow: hidden;
    background #eeeeeeCC

    &__image
      grid-row 1 / 4
      grid-column 2 / 3
      width 100%
      height 100%
      object-fit cover

    &__name
      grid-row 1 / 2
      grid-column 1 / 2
      font-size 3rem
      display flex
      align-items center
      justify-content center
      font-family: 'messenger-texture';

    &__info
      grid-row 2 / 3
      grid-column 1 / 2
      padding 0 3rem
      display flex
      align-items flex-start
      justify-content center
      overflow-y auto

    &__ingredients
      display flex
      align-items center
      justify-content center

    .btn--shuffle
      position absolute
      top 10px
      right 10px

    .btn--ingredients
      color #ee5354
      border 1.5px solid #ee5354
      background white

      &:hover
        transform translateY(-3px)
</style>
