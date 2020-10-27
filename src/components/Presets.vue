<template>
  <div>
    <div
        v-for="challenge in challenges"
        v-bind:key="challenge.id"
        class="card preset"
    >
      <router-link  class="header-item" :to="`/challenges/${challenge.id}`">
        <div class="card-header">
          <h1>{{ getName(challenge) }}</h1>
        </div>
      </router-link >


    </div>
  </div>
</template>

<script>
import {preferences} from "@/preferences";

export default {
  name: "Presets",
  data: () => {
    let ctx = require.context('../assets/challenges/', true, /\.json$/);
    return {
      challenges: ctx.keys()
          .map(key => {
            return {
              name: ctx(key).name,
              id: key.split('/')[1]
            }
          })
    }
  },
  methods: {
    getName(challenge) {
      return challenge?.name?.[preferences.language]
    }
  }
}
</script>

<style scoped>
.preset {

}
</style>