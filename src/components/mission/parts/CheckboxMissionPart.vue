<template>
  <div class="flex-row mission-row checkbox-mission-row">
    <label for="checkbox-part">{{ this.missionPartJson.description | localeString }}</label>
    <input v-model="missionPartJson.checked" v-on:change="determineScore" id="checkbox-part" type="checkbox">
  </div>
</template>

<script>

export default {
  name: "CheckboxMissionPart",
  props: {
    missionPartJson: Object
  },
  data: function () {
    return {
      score: 0,
    }
  },
  beforeMount() {
    if (!this.missionPartJson.checked) {
      this.missionPartJson.checked = false;
    }
  },
  mounted() {
    this.determineScore()
  },
  methods: {
    determineScore: function () {
      let previous = this.score;
      this.score = this.missionPartJson.checked * this.missionPartJson.completionScore;

      if (previous !== this.score) {
        this.$emit('score-changed', previous, this.score)
      }
    }
  }

}
</script>

<style scoped>
.checkbox-mission-row {
  align-items: center;
}
</style>