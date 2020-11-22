<template>
  <div>
    <h1>Saved Challenges</h1>

    <div v-if="scoresheetMap">
      <details  v-for="(scoresheets, key) in scoresheetMap" :key="key">
        <summary>{{i18nService.getForCurrentLanguage(scoresheets[0].challenge.name)}}</summary>

        <div v-for="scoresheet in scoresheets" v-bind:key="scoresheet.id">
          {{scoresheet.name}}
          {{scoresheet.totalScore}}
          {{scoresheet.savedAt}}
        </div>
      </details>
    </div>
    <div v-else>
      Geen opgeslagen scoreformulieren gevonden
    </div>

  </div>
</template>

<script>
import i18nService from "@/services/i18nService";
import scoresheetService from "@/services/scoresheetService";
import {groupBy} from "@/util/collections";

export default {
  name: "SavedChallenges",
  data: function() {
    return {
      i18nService: i18nService,
      scoresheetMap: []
    }
  },
  mounted() {
    scoresheetService.getScoresheets()
        .then(value => this.scoresheetMap = groupBy(value, (sheet) => {
          return sheet.challenge.id
        }))
  },
}
</script>

<style scoped>

</style>