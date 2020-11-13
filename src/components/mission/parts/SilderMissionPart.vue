<template>
  <div class="flex-column flex-filler mission-row">
    <div class="flex-row">
      <span>{{ i18nService.getForCurrentLanguage(missionPartJson.description) }}</span>
      <span class="flex-filler"></span>
      <div class="flex-row">
        <input type="number"
               :min="missionPartJson.min"
               :max="missionPartJson.max"
               :step="1"
               v-model.number="selectedNumber"
               v-on:change="determineScore"
               class="slider-number"
        />
      </div>
    </div>
    <input type="range"
           :min="missionPartJson.min"
           :max="missionPartJson.max"
           :step="1"
           v-model.number="selectedNumber"
           v-on:change="determineScore"
           class="slider"
    />
  </div>
</template>

<script>
import i18nService from "@/services/i18nService";

export default {
  name: "SliderMissionPart",
  props: {
    missionPartJson: Object,
  },
  data: function () {
    return {
      i18nService: i18nService,
      score: 0,
      // To improve the observability, use a number in data.
      selectedNumber: this.missionPartJson.selectedNumber
    }
  },
  beforeMount() {
    if (!this.selectedNumber) {
      this.selectedNumber = 0;
      this.missionPartJson.selectedNumber = 0;
    }
  },
  methods: {
    determineScore: function () {
      this.missionPartJson.selectedNumber = this.selectedNumber

      if (this.selectedNumber > this.missionPartJson.max)
        this.selectedNumber = this.missionPartJson.max;
      else if (this.selectedNumber < this.missionPartJson.min)
        this.selectedNumber = this.missionPartJson.min;

      let previous = this.score;
      this.score = this.selectedNumber * this.missionPartJson.scorePerStep

      if (previous !== this.score) {
        this.$emit('score-changed', previous, this.score)
      }
    }
  }
}
</script>

<style scoped>
.slider-number {
  min-width: 3em;
  margin-left: 8px;
}

.slider {
  flex-grow: 1;
  padding-top: 4px;
  padding-bottom: 4px;
}
</style>