import Vue from 'vue'
import VueRouter from 'vue-router'
import RoutedChallenge from "@/components/RoutedChallenge";
import Presets from "@/components/Presets";
import BuilderSteps from "@/components/builder/BuilderSteps";
import SavedScoresheets from "@/components/scoresheets/SavedScoresheets";
import SavedScoresheet from "@/components/scoresheets/SavedScoresheet";

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: 'challenges' },
    { path: '/builder', component: BuilderSteps },
    { path: '/challenges/:id', component: RoutedChallenge },
    { path: '/challenges/', component: Presets },
    { path: '/saved-scoresheets/', component: SavedScoresheets },
    { path: '/saved-scoresheets/:id', component: SavedScoresheet },
]

const router = new VueRouter({
    routes
})

router.openModals = []

// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from, next) => {
    if(router.openModals.length > 0) {
        let modal = router.openModals.pop()
        modal.close()
        next(false)
    } else {
        next()
    }
})

export default router