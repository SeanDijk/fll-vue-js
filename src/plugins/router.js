import Vue from 'vue'
import VueRouter from 'vue-router'
import RoutedChallenge from "@/components/RoutedChallenge";
import Presets from "@/components/Presets";
import BuilderSteps from "@/components/builder/BuilderSteps";

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: 'challenges' },
    { path: '/builder', component: BuilderSteps },
    { path: '/challenges/:id', component: RoutedChallenge },
    { path: '/challenges/', component: Presets },
]

const router = new VueRouter({
    routes
})

export default router