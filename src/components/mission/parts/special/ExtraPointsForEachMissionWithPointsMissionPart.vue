<template>
  <div class="flex-row mission-row">
    <label for="checkbox-part">{{ i18nService.getForCurrentLanguage(description) }}</label>
    <input v-model="checked" v-on:change="determineScore" id="checkbox-part" type="checkbox">
  </div>
</template>

<script>
import {EventBus} from "@/event-bus"
import i18nService from "@/services/i18nService";

export default {
  name: "ExtraPointsForEachMissionWithPointsMissionPart",
  props: {
    description: Object,
    scorePerCompletion: Number,
    exceptions: Object,
  },
  data: function () {
    return {
      i18nService: i18nService,
      score: 0,
      trackedScore: 0,
      checked: false,
    }
  },
  methods: {
    determineScore: function () {
      let previous = this.score;
      if (this.checked) {
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
      let deltaScore = this.exceptions[missionId]
      if (deltaScore === undefined) {
        deltaScore = this.scorePerCompletion;
      }
      if (oldScore === 0 && newScore > 0) {
        this.trackedScore = this.trackedScore + deltaScore
      } else if (newScore === 0) {
        this.trackedScore = this.trackedScore - deltaScore
      }
      this.determineScore();
    });
  }
}
</script>

<style scoped>

</style>