<template>
  <div>
    <div class="flex-row missions">
      <mission
          v-for="mission in challengeJson.missions"
          v-bind:key=mission.id
          :mission-json="mission"
          :challenge-id="challengeJson.id"
          :from-assets="fromAssets"
          v-on:mission-score-changed="onMissionScoreChanged"
          class="mission"
      />
    </div>

    <div class="sticky-bottom">
      <button v-on:click="openSaveModal()">{{ $t('challenge.menu.save') }}</button>
      <button v-on:click="$emit('reload-challenge')">{{ $t('challenge.menu.reset') }}</button>
      <strong>{{ $t('challenge.menu.totalScore') }}: {{ totalScore }}</strong>
    </div>

    <modal ref="saveModal">
      <save-scoresheet-form
          ref="scoresheetForm"
          :total-score="totalScore"
          :challenge-json="challengeJson"
          @on-save="$refs['saveModal'].close(); $refs['snackbar'].open();"
          @on-cancel="$refs['saveModal'].close()"
      >
      </save-scoresheet-form>
    </modal>

    <snackbar ref="snackbar">
      Succesvol opgeslagen!
    </snackbar>
  </div>
</template>

<script>
import Mission from "./mission/Mission";
import {EventBus} from "@/event-bus"
import Modal from "@/components/util/Modal";
import SaveScoresheetForm from "@/components/scoresheets/SaveScoresheetForm";
import Snackbar from "@/components/util/Snackbar";

export default {
  name: "Challenge",
  components: {Snackbar, SaveScoresheetForm, Modal, Mission},
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
    openSaveModal: function () {
      this.$refs["saveModal"].show()

      this.$nextTick(() => {
        this.$refs["scoresheetForm"].focus()
      })
    }
  },
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