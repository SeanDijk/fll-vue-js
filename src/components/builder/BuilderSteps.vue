<template>
  <div>
    Welcome to the challenge builder. Here you can create new challenges or edit existing ones.

    <select v-model="selectedChallenge" >
      <option v-for="opt in allChallenges" v-bind:key="opt.id" :value="opt">
        {{i18nService.getForCurrentLanguage(opt.name)}}
      </option>
    </select>
    <button v-on:click="setExisting(selectedChallenge)">Pick existing</button>

    <button v-on:click="setBlank()">Create new</button>

    <challenge-builder
      :challenge="this.challenge"
    >

    </challenge-builder>
    <!--  Hier komt dan de builder  -->


    <button>Save to device</button>
    <button>Save to device and submit</button>

  </div>

</template>

<script>
import ChallengeBuilder from "@/components/builder/ChallengeBuilder";
import challengeService from "@/services/challengeService";
import i18nService from "@/services/i18nService";

export default {
  name: "BuilderSteps",
  components: {ChallengeBuilder},
  methods: {
    setBlank() {
      this.challenge = challengeService.createBlank()
    },
    setExisting(obj){
      console.log(obj)
      this.challenge = obj
    }
  },
  data: function () {
    return {
      i18nService: i18nService,
      challenge: undefined,
      allChallenges: challengeService.getAll(),
      selectedChallenge: undefined
    }
  }
}
</script>

<style scoped>

</style>