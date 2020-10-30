<template>
  <div class="flex-row mission-row">
    <span>{{ i18nService.getForCurrentLanguage(description) }}</span>
    <div class="flex-column text-no-wrap">
      <div v-for="(choice, index) in choices" v-bind:key="index">
        <input type="radio"
               :id="uuid + index"
               :name="uuid"
               :value="index"
               :checked="index === 0"
               v-model="selectedIndex"
               v-on:change="determineScore"
        >
        <label :for="uuid + index">{{ i18nService.getForCurrentLanguage(choice.choice) }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import {v4 as uuidv4} from 'uuid';
import i18nService from "@/services/i18nService";

export default {
  name: "MultipleChoiceMissionPart",
  props: {
    description: Object,
    choices: Array,
  },
  data: function () {
    return {
      i18nService: i18nService,
      score: 0,
      selectedIndex: 0,
      uuid: uuidv4()
    }
  },
  methods: {
    determineScore: function () {
      let previous = this.score;
      this.score = this.choices[this.selectedIndex].score;
      if (previous !== this.score) {
        this.$emit('score-changed', previous, this.score)
      }
    },
  },
}
</script>

<style scoped>

</style>