<template>
  <div>

    <div class="card card-content builder-step" v-if="!challenge">

      Welcome to the challenge builder. Here you can create new challenges or edit existing ones.
      <br/>
      <br/>

      <div class="button-row">
        <button v-on:click="setBlank()">Create new</button>
        <span class="padding-hor">or Pick existing: </span>
        <select @change="setExisting(selectedChallenge)" v-model="selectedChallenge" >
          <option v-for="opt in allChallenges" v-bind:key="opt.id" :value="opt">
            {{opt.name | localeString}}
          </option>
        </select>
      </div>
    </div>


    <challenge-builder v-if="challenge"
      :backingJson="challenge"
    >
    </challenge-builder>

  </div>

</template>

<script>
import ChallengeBuilder from "@/components/builder/ChallengeBuilder";
import challengeService from "@/services/challengeService";
export default {
  name: "BuilderSteps",
  components: {ChallengeBuilder},
  methods: {
    setBlank() {
      this.challenge = challengeService.createBlank()
    },
    setExisting(obj){
      this.challenge = challengeService.createFrom(obj)
    }
  },
  data: function () {
    return {
      challenge: undefined,
      allChallenges: challengeService.getAll(),
      selectedChallenge: undefined
    }
  }
}
</script>

<style scoped>


.builder-step {
  box-sizing: border-box;
  max-width: 800px;
  width: 100%;
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.button-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.padding-hor {
  padding-left: 8px;
  padding-right: 8px;
}

</style>