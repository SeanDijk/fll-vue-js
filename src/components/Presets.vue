<template>
  <div class="wrapper">
    <div
        v-for="challenge in challenges"
        v-bind:key="challenge.id"
        class="card card-hover challenge"
    >
      <router-link  class="header-item" :to="`/challenges/${challenge.id}`">
        <div class="card-header">
          {{ challenge.name | localeString }}
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
import {getImageSrc} from "@/services/imageRetriever";
import challengeService from "@/services/challengeService"

export default {
  name: "Presets",
  data: () => {
    return {
      challenges: challengeService.getAll()
    }
  },
  methods: {
    getImage(challenge) {
      return getImageSrc(challenge.id, challenge?.logo)
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-img {
  background: unset;
  height: 200px;
}
.card-img > img {
  height: 100%;
  width: auto;
}
.card-header {
  text-align: center;
}

.challenge {
  max-width: 300px;
  width: 100%;
}

.header-item {
  color: inherit; /* blue colors for links too */
  text-decoration: inherit; /* no underline */
}

@media only screen and (min-width: 768px) {
  .wrapper {
    flex-direction: row;
  }
}

</style>