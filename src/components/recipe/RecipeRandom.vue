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
      <button @click="shuffleRecipe" class="container__recipe__btn">
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
    border 1px solid red
    position relative
    padding 3rem
    height 50rem
    max-width 100rem

    &__image
      width 20rem
      height 20rem
      border-radius 5px
      object-fit cover

    &__btn
      border none
      padding 1rem 1.5rem
      border-radius 10px
      position absolute
      top 10px
      right 10px
      color white
      background #ee5354
      text-transform uppercase
      font-weight bold
      transition all .5s

      &:hover
        transform translateY(-3px)
</style>
