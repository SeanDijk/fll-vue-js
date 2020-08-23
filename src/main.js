import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.config.productionTip = false

import "@/assets/main.css"
import HelloWorld from "./components/HelloWorld";
import Builder from "./components/builder/ChallengeBuilder";
import RoutedChallenge from "./components/RoutedChallenge";

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/builder', component: Builder },
  { path: '/challenges/:id', component: RoutedChallenge },

]


const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
