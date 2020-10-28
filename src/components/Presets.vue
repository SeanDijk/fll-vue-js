<template>
  <div class="flex-row flex-wrap">
    <div
        v-for="challenge in challenges"
        v-bind:key="challenge.id"
        class="card card-hover challenge"
    >
      <router-link  class="header-item" :to="`/challenges/${challenge.id}`">
        <div class="card-header">
          <h1>{{ getName(challenge) }}</h1>
        </div>
        <div class="card-img" v-if="getImage(challenge)">
          <img :src="getImage(challenge)" :alt="challenge.logo.description">
        </div>
        <div class="card-content"></div>
      </router-link >


    </div>
  </div>
</template>

<script>
import {preferences} from "@/preferences";
import {getImageSrc} from "@/imageRetriever";

export default {
  name: "Presets",
  data: () => {
    let ctx = require.context('../assets/challenges/', true, /\.json$/);
    return {
      challenges: ctx.keys()
          .map(key => {
            let data = ctx(key)
            data.id = key.split('/')[1]
            return data
          })
    }
  },
  methods: {
    getName(challenge) {
      return challenge?.name?.[preferences.language]
    },
    getImage(challenge) {
      console.log("?",challenge)
      return getImageSrc(true, challenge.id, challenge?.logo?.path)
    }
  }
}
</script>

<style scoped>

.card-img {
  background: unset;
  height: 200px;
}
.card-img > img {
  height: 100%;
  width: auto;
}

.challenge {
  max-width: 400px;
}

.header-item {
  color: inherit; /* blue colors for links too */
  text-decoration: inherit; /* no underline */
}
</style>