<template>
  <div class="container">
    <div
      v-for="category in categories"
      :key="category.idCategory"
      class="container__category"
    >
      <img
        :src="category.strCategoryThumb"
        class="container__category__image"
        alt="Recipe Category"
      />
      <h3 class="container__category__name">{{ category.strCategory }}</h3>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "RecipeCategories",
  created() {
    this.$store.dispatch("fetchCategories");
  },
  computed: {
    categories() {
      return this.$store.getters.categories;
    },
  },
};
</script>

<style lang="stylus" scoped>

.container
  min-height 100vh
  max-width 100rem
  margin 0 auto
  padding 10rem
  display flex
  align-items center
  justify-content center
  display grid
  grid-template-columns repeat(3, 1fr)
  gap 2rem

  @media only screen and (max-width: 770px)
    grid-template-columns 1fr 1fr

  @media only screen and (max-width: 570px)
    grid-template-columns 1fr

  &__category
    position relative
    display flex
    align-items center
    justify-content center
    overflow hidden
    border-radius 15px
    height 15rem
    transition all .5s

    @media only screen and (max-width: 770px)
      height 18rem

    &:hover
      transform scale(1.05)

    &__name
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      display flex
      align-items center
      justify-content center
      background #5a5a5a3d
      color white
      z-index 10
      font-size 2rem

    &__image
      object-fit cover
      width 100%
</style>
