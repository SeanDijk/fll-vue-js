import Vue from 'vue'
import VueRouter from 'vue-router'
import Builder from "@/components/builder/ChallengeBuilder";
import RoutedChallenge from "@/components/RoutedChallenge";
import Presets from "@/components/Presets";

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: 'challenges' },
    { path: '/builder', component: Builder },
    { path: '/challenges/:id', component: RoutedChallenge },
    { path: '/challenges/', component: Presets },
]

const router = new VueRouter({
    routes
})

export default router