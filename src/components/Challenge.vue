<template>
  <div>
    <div class="flex-row missions">
      <mission
          v-for="mission in challengeJson.missions"
          v-bind:key=mission.id
          :mission-json="mission"
          :from-assets="fromAssets"
          v-on:mission-score-changed="onMissionScoreChanged"
          class="mission"
      />
    </div>

    <div class="sticky-bottom">
      <button v-on:click="saveScore()">Save</button>
      <button >Reset</button>
      <strong>Total score: {{ totalScore }}</strong>
    </div>
  </div>
</template>

<script>
import Mission from "./mission/Mission";
import {EventBus} from "@/event-bus"
import scoresheetService from "@/services/scoresheetService";

export default {
  name: "Challenge",
  components: {Mission},
  props: {
    challengeJson: Object,
    fromAssets: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      totalScore: 0,
      missionsStatus: {}
    }
  },
  methods: {
    onMissionScoreChanged: function (mission) {
      let oldMissionScore = this.missionsStatus[mission.missionJson.id];
      if (oldMissionScore === undefined) {
        oldMissionScore = 0;
      }

      this.missionsStatus[mission.missionJson.id] = mission.totalScore;
      this.totalScore = this.totalScore - oldMissionScore + mission.totalScore;
      EventBus.$emit("mission-score", mission.missionJson.id, oldMissionScore, mission.totalScore)
    },
    saveScore: function () {
      scoresheetService.saveScoresheet("temp-name", this.totalScore, this.challengeJson)
    }
  }
}
</script>

<style scoped>
.sticky-bottom {
  position: sticky;
  bottom: 0;
  background-color: #4caf50;
  padding: 16px;
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.missions {
  flex-wrap: wrap;
  justify-content: space-evenly;
  /*align-items: center;*/
}

.mission {
  flex-grow: 1;
}
</style>