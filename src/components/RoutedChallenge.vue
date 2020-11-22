<template>
  <challenge
      :challengeJson="challengeJson"
      :from-assets="true">
  </challenge>
</template>

<script>
import Challenge from "./Challenge";

export default {
  name: "RoutedChallenge",
  components: {Challenge},
  data() {
    return {
      challengeJson: require(`../assets/challenges/${this.$route.params.id}/challenge.json`)
    }
  }
}
</script>

<style scoped>

</style>