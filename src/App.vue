<template>
  <div id="app">
    <the-navbar></the-navbar>
    <transition name="slide-fade">
      <router-view />
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TheNavbar from "./components/TheNavbar.vue";

export default Vue.extend({
  name: "App",
  components: {
    TheNavbar,
  },
});
</script>

<style lang="stylus">

@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Paytone+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Raleway&display=swap');
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
  // background-image url('./assets/homepagev5.jpg')
  // background-position center
  // background-size cover
  background-color: #eee;
  // background-color: #8EC5FC;
  // background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);
  min-height 100vh

html
  font-size: 62.5%; // 1rem = 10px

  h1
    font-size: 4.6rem;

  h2
    font-size: 2.2rem;

  h3
    font-size: 1.6rem;

  h4
    font-size: 1rem;

  p
    font-size: 1.3rem;

button:focus
  outline 0

input:focus
  outline 0


.slide-fade-enter-active
  transition: all .8s ease;

.slide-fade-leave-active
  transition: all .8s ease

.slide-fade-enter, .slide-fade-leave-to
  transform: translateY(25px);
  opacity: 0;
</style>
