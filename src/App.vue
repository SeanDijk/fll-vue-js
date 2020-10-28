<template>
  <div id="app">
    <app-header/>

    <transition
        name="fade"
        mode="out-in">
      <router-view></router-view>
    </transition>

    <app-footer/>

  </div>
</template>

<script>
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/Footer";

// class Mission {
//     constructor(id, name, description, missionParts) {
//         this.id = id;
//         this.name = name;
//         this.description = description;
//         this.missionParts = missionParts;
//     }
// }


export default {
  name: 'app',
  components: {
    AppHeader,
    AppFooter
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
