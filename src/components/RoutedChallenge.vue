<template>
  <challenge
      ref="challenge"
      :key="componentKey"
      :challengeJson="challengeJson"
      :from-assets="true"
      @reload-challenge="refresh()">
  </challenge>
</template>

<script>
import Challenge from "./Challenge";
import {log} from "@/main";

export default {
  name: "RoutedChallenge",
  components: {Challenge},
  data() {
    return {
      challengeJson: this.retrieveJson(),
      componentKey: 0,
    }
  },
  methods: {
    retrieveJson(){
      // Make a clone so that the original stays intact.
      return JSON.parse(JSON.stringify(require(`../assets/challenges/${this.$route.params.id}/challenge.json`)));
    },
    refresh(){
      this.$emit('action-without-transition', () => {
        log.debug("Reloading challenge ", this.$route.params.id)
        this.challengeJson = this.retrieveJson()
        this.componentKey += 1;
      })
    }

  }
}
</script>

<style scoped>

</style>