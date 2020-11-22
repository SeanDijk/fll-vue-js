<template>
  <challenge v-if="scoresheet"
      :challengeJson="scoresheet.challenge"
      :from-assets="true">
  </challenge>
</template>

<script>
import Challenge from "@/components/Challenge";
import scoresheetService from "@/services/scoresheetService";

export default {
  name: "SavedScoresheet",
  components: {Challenge},
  data() {
    return {
      scoresheet: undefined
    }
  },
  beforeMount() {
    scoresheetService.getScoresheetById(this.$route.params.id).then(value => {
      console.log(value)
      this.scoresheet = value
    })
  }
}
</script>

<style scoped>

</style>