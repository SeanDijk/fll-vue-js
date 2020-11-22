<template>
  <div class="flex-row mission-row">
    <span>{{ missionPartJson.description | localeString }}</span>
    <div class="flex-column text-no-wrap">
      <div v-for="(choice, index) in missionPartJson.choices" v-bind:key="index">
        <input type="radio"
               :id="uuid + index"
               :name="uuid"
               :value="index"
               :checked="index === 0"
               v-model="missionPartJson.selectedIndex"
               v-on:change="determineScore"
        >
        <label :for="uuid + index">{{ choice.choice | localeString }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import {v4 as uuidv4} from 'uuid';

export default {
  name: "MultipleChoiceMissionPart",
  props: {
    missionPartJson: Object,
  },
  data: function () {
    return {
      score: 0,
      selectedIndex: 0,
      uuid: uuidv4()
    }
  },
  beforeMount() {
    if (!this.missionPartJson.selectedIndex) {
      this.missionPartJson.selectedIndex = 0;
    }
  },
  mounted() {
    this.determineScore()
  },
  methods: {
    determineScore: function () {
      let previous = this.score;
      this.score = this.missionPartJson.choices[this.missionPartJson.selectedIndex].score;
      if (previous !== this.score) {
        this.$emit('score-changed', previous, this.score)
      }
    },
  },
}
</script>

<style scoped>

</style>