<template>
  <div id="app">
    <app-header/>

    <transition
        :name="useTransition ? 'fade' : ''"
        mode="out-in">
      <router-view
      @action-without-transition="withoutTransition"
      ></router-view>
    </transition>

    <app-footer/>

  </div>
</template>

<script>
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/Footer";

export default {
  name: 'app',
  components: {
    AppHeader,
    AppFooter
  },
  data: function (){
    return {
        useTransition: true
    }
  },
  methods: {
    // Method that can be used to do a (re)load a component without triggering the fade transition.
    withoutTransition(action){
      this.useTransition = false
      action()
      this.$nextTick(() => this.useTransition = true)
    }
  }
}
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
