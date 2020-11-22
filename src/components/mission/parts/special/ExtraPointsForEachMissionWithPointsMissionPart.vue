<template>
  <div class="flex-row mission-row">
    <label for="checkbox-part">{{ missionPartJson.description | localeString }}</label>
    <input v-model="missionPartJson.checked" v-on:change="determineScore" id="checkbox-part" type="checkbox">
  </div>
</template>

<script>
import {EventBus} from "@/event-bus"

export default {
  name: "ExtraPointsForEachMissionWithPointsMissionPart",
  props: {
    missionPartJson: Object,
  },
  data: function () {
    return {
      score: 0,
      trackedScore: 0
    }
  },
  mounted() {
    this.determineScore()
  },
  methods: {
    determineScore: function () {
      let previous = this.score;
      if (this.missionPartJson.checked) {
        this.score = this.trackedScore;
      } else {
        this.score = 0
      }

      if (previous !== this.score) {
        this.$emit('score-changed', previous, this.score)
      }
    }
  },
  created: function () {
    EventBus.$on('mission-score', (missionId, oldScore, newScore) => {
      let deltaScore = this.missionPartJson.exceptions[missionId]
      if (deltaScore === undefined) {
        deltaScore = this.missionPartJson.scorePerCompletion;
      }

      console.log(oldScore, newScore, deltaScore)

      if (oldScore === 0 && newScore > 0) {
        this.trackedScore = this.trackedScore + deltaScore
      } else if (newScore === 0) {
        this.trackedScore = this.trackedScore - deltaScore
      }

      console.log(this.trackedScore)

      this.determineScore();
    });
  }
}
</script>

<style scoped>

</style>