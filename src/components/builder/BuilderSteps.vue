<template>
  <div>
    Welcome to the challenge builder. Here you can create new challenges or edit existing ones.

    <button>Pick existing</button>
    <button>Create new</button>


    <challenge-builder

    >

    </challenge-builder>
    <!--  Hier komt dan de builder  -->


    <button>Save to device</button>
    <button>Save to device and submit</button>

  </div>

</template>

<script>
import ChallengeBuilder from "@/components/builder/ChallengeBuilder";
export default {
  name: "BuilderSteps",
  components: {ChallengeBuilder}
}
</script>

<style scoped>

</style>