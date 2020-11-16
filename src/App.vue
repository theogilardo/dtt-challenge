<template>
  <div id="app">
    <the-navbar></the-navbar>
    <router-view />
    <the-footer></the-footer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TheNavbar from "./components/TheNavbar.vue";
import TheFooter from "./components/TheFooter.vue";

export default Vue.extend({
  name: "App",
  components: {
    TheNavbar,
    TheFooter,
  },
});
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@300;400&display=swap');

@font-face {
  src: url(./fonts/Messenger-Regular.otf);
  font-family: messenger-regular;
}

@font-face {
  src: url(./fonts/Messenger-Rough.otf);
  font-family: messenger-rough;
}

@font-face {
  src: url(./fonts/Messenger-Texture.otf);
  font-family: messenger-texture;
}

*,
*::before,
*::after
  margin: 0;
  padding: 0;
  box-sizing: border-box
  text-decoration none

#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  background-image url('./assets/homepagev5.jpg')
  background-position center
  background-size cover
  background-color: #eee;
  min-height 100vh

html
  font-size: 62.5% // 1rem = 10px

  h1
    font-size: 4.6rem

  h2
    font-size: 2.2rem

  h3
    font-size: 1.6rem

    @media only screen and (max-width: 770px)
      font-size: 3rem

    @media only screen and (max-width: 400px)
      font-size: 2.2rem

  h4
    font-size: 1rem

  p
    font-size: 1.4rem

    @media only screen and (max-width: 820px)
      font-size: 1.8rem

    @media only screen and (max-width: 400px)
      font-size: 1.5rem

.btn
  border none
  padding 1rem 1.5rem
  border-radius 10px
  color white
  background-image: linear-gradient(132deg, #F4D03F 0%, #16A085 100%);
  font-weight bold
  cursor pointer
  transition all .5s

  @media only screen and (max-width: 460px)
    z-index 10
    padding 1rem
    font-size 1rem

  &:hover
    transform translateY(-3px)

button:focus
  outline 0

input:focus
  outline 0
</style>
