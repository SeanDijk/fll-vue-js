import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueLogger from 'vuejs-logger';

Vue.use(VueRouter)
Vue.config.productionTip = false

const isProduction = process.env.NODE_ENV === 'production';

const options = {
  isEnabled: true,
  logLevel : isProduction ? 'error' : 'debug',
  stringifyArguments : false,
  showLogLevel : true,
  showMethodName : true,
  separator: '|',
  showConsoleColors: true
};

Vue.use(VueLogger, options);


import "@/assets/scss/main.scss"
import "@/assets/scss/buttons.scss"
import HelloWorld from "./components/HelloWorld";
import Builder from "./components/builder/ChallengeBuilder";
import RoutedChallenge from "./components/RoutedChallenge";
import Presets from "@/components/Presets";

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/builder', component: Builder },
  { path: '/challenges/:id', component: RoutedChallenge },
  { path: '/challenges/', component: Presets },

]


const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
