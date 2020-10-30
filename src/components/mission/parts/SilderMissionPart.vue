<template>
  <div class="flex-column flex-filler mission-row">
    <div class="flex-row">
      <span>{{ i18nService.getForCurrentLanguage(description) }}</span>
      <span class="flex-filler"></span>
      <div class="flex-row">
        <input type="number"
               :min="min"
               :max="max"
               :step="1"
               v-model.number="selectedNumber"
               v-on:change="determineScore"
               class="slider-number"
        />
      </div>
    </div>
    <input type="range"
           :min="min"
           :max="max"
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
    description: Object,
    min: Number,
    max: Number,
    scorePerStep: Number,
  },
  data: function () {
    return {
      i18nService: i18nService,
      score: 0,
      selectedNumber: 0
    }
  },
  methods: {
    determineScore: function () {
      if (this.selectedNumber > this.max)
        this.selectedNumber = this.max;
      else if (this.selectedNumber < this.min)
        this.selectedNumber = this.min;

      let previous = this.score;
      this.score = this.selectedNumber * this.scorePerStep

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