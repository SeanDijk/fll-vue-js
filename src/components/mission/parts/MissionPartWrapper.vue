<template>

  <div>
    <checkbox-mission-part
        v-if="missionPartJson.type === 'CheckBox'"
        :mission-part-json="missionPartJson"
        @score-changed="emitUp"/>
    <multiple-choice-mission-part
        v-if="missionPartJson.type === 'MultipleChoice'"
        :mission-part-json="missionPartJson"
        @score-changed="emitUp"
    />
    <slider-mission-part
        v-if="missionPartJson.type === 'Slider'"
        :mission-part-json="missionPartJson"
        @score-changed="emitUp"
    />
    <extra-points-for-each-mission-with-points-mission-part
        v-if="missionPartJson.type === 'ExtraPointsForEachMissionWithPoints'"
        :mission-part-json="missionPartJson"
        @score-changed="emitUp"
    />
  </div>


</template>

<script>
import CheckboxMissionPart from "@/components/mission/parts/CheckboxMissionPart";
import MultipleChoiceMissionPart from "@/components/mission/parts/MultipleChoiceMissionPart";
import SliderMissionPart from "@/components/mission/parts/SilderMissionPart";
import ExtraPointsForEachMissionWithPointsMissionPart
  from "@/components/mission/parts/special/ExtraPointsForEachMissionWithPointsMissionPart";
export default {
  name: "MissionPartWrapper",
  components: {
    ExtraPointsForEachMissionWithPointsMissionPart,
    SliderMissionPart, MultipleChoiceMissionPart, CheckboxMissionPart},
  props: {
    missionPartJson: Object,
  },
  methods: {
    emitUp(previous, updated) {
      this.$emit('score-changed', previous, updated)
    }
  }
}
</script>

<style scoped>

</style>