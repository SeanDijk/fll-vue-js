<template>
  <fieldset class="container form">
    <legend><h2>Missie</h2></legend>

    <button v-on:click="remove" class="btn-danger">X</button>


    <label class="form-row">Name:
      <language-string-field class="form-row-input" v-model="missionJson.name" id="missionName"/>
    </label>

    <!-- Using a label as wrapper messes with the click detection for the delete button-->
    <span class="form-row"><label>Afbeeldingen:</label>
      <image-input class="form-row-input" mode="multiple" v-model="missionJson.images" :fallback-path="challengeId"></image-input>
    </span>

    <br>
    <fieldset>
      <legend><h3>Missie onderdelen</h3></legend>
      <draggable id="missionParts" v-model="missionJson.missionParts">
        <mission-part-builder
            v-for="missionPart in missionJson.missionParts"
            :missionPartJson="missionPart"
            v-bind:key="missionPart.id"
            class="builder-mission-part"
            @deleteMissionPart="deleteMissionPart($event)"
        />
      </draggable>
    </fieldset>

    <button class="btn-primary" v-on:click="addMissionPart">Missie onderdeel toevoegen</button>

  </fieldset>
</template>

<script>
import draggable from 'vuedraggable'

import MissionPartBuilder from "./MissionPartBuilder";
import LanguageStringField from "./LanguageStringField";
import ImageInput from "@/components/util/ImageInput";
import hashService from "@/services/hashService";

export default {
  name: "MissionBuilder",
  components: {ImageInput, LanguageStringField, MissionPartBuilder, draggable},
  props: {
    // Used for delete
    id: String,
    missionJson: Object,
    challengeId: String
  },
  methods: {
    addMissionPart() {
      this.missionJson.missionParts.push({
        id: hashService.simpleTimebasedHash()
      })

      console.log(this.missionJson.missionParts)
    },
    deleteMissionPart(partToDelete) {
      this.missionJson.missionParts = this.missionJson.missionParts.filter(part => part.id !== partToDelete.id)
    },
    remove() {
      this.$emit('deleteMission', this.missionJson.id)
    },

  },


}
</script>

<style scoped>

#missionParts {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.container {
  position: relative;
}

.builder-mission-part {
  padding: 16px;
  /*width: 100%;*/
  border-bottom: #222222 solid 1px;
}

.builder-mission-part:last-child {
  border-bottom: 0;
}

.btn-danger {
  /*todo global class for right corner*/
  position: absolute;
  top: 1em;
  right: 1em;
}


</style>