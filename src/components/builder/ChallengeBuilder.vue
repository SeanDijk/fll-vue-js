<template>
  <div class="screen">
    <div id="builder" class="form" v-if="challenge">
      <h1>Challenge builder</h1>

      <input type="text" v-model="challenge.id" id="challengeId"/>


      <label for="challengeName">Name:</label>
      <language-string-field v-model="challenge.name" id="challengeName"/>

      <div id="newMissions">
        <draggable v-model="challenge.missions">
          <!-- use mission.data since passing just mission is not allowed.-->
          <mission-builder
              v-for="mission in challenge.missions.map( a => wrap(a))"
              v-model="mission.data"
              v-bind:key=mission.id
              :id="mission.id"
              :images="mission.data.images"
              @deleteMission="deleteMission($event)"
          />
        </draggable>
      </div>


      <button v-on:click="addMission">Add mission</button>
      <button v-on:click="download">Save</button>
    </div>

    <div id="preview">
      <h1>Preview</h1>
      <button v-on:click="reloadPreview">Reload</button>
      <challenge v-if="previewData"
                 :name="previewData.name"
                 :missions="previewData.missions"
                 :key="previewDataKey"
      >
      </challenge>
    </div>

  </div>
</template>

<script>
import draggable from 'vuedraggable'
import MissionBuilder from "./MissionBuilder";
import {Wrapper} from "./models";
import LanguageStringField from "./LanguageStringField";
import Challenge from "../Challenge";
import JSZip from "jszip";
import {saveAs} from 'file-saver';

export default {
  name: "ChallengeBuilder",
  components: {Challenge, LanguageStringField, MissionBuilder, draggable},
  props: {
    challenge: Object
  },
  data: function () {
    return {
      previewData: undefined,
      previewDataKey: 0,
    }
  },
  methods: {
    wrap: function(obj) {
      return new Wrapper(obj)
    },
    addMission: function () {
      this.challenge.missions.push({missionParts: [], images: []})
    },
    deleteMission: function (toDelete) {
      console.log(toDelete)
      this.challenge.missions = this.challenge.missions.filter(mission => mission !== toDelete)
    },
    download: function () {
      //todo also export images etc.

      const data = JSON.stringify(this.challenge);


      let zip = new JSZip();
      zip.file("challenge.json", data)

      // get all the images

      console.log("missions: " , this.challenge.missions)
      this.challenge.missions
          .flatMap(mission => mission.images)
          .forEach(imgWrapper => {
            console.log(imgWrapper)

             zip.file(
              imgWrapper.data.path,
              imgWrapper.src.replace('data:image/png;base64,', ''),
              {base64: true}
              )})
      // .forEach(imgWrapper => console.log(imgWrapper.src))


      zip.generateAsync({type: "blob"})
          .then(value => saveAs(value, this.challenge.id + ".zip"))
    },
    open: function () {
      //todo open a challenge
    },
    log() {
      console.log(this.missions)
    },
    reloadPreview() {
      console.log("old {}", this.previewData)
      this.previewData = JSON.parse(JSON.stringify({
        name: this.name,
        missions: this.missions
      }));
      this.previewDataKey += 1
    }
  },
  computed: {}


}


</script>

<style scoped>
.screen {
  display: flex;
  flex-direction: row;
}

#builder {
  flex-grow: 1;
  flex-direction: column;
  display: flex;
  padding-left: 8px;
  padding-right: 8px;
}

#preview {
  flex-grow: 1;
  min-width: 300px;
  max-width: 500px;
}

#newMissions {
  padding: 8px;
}

.builder-part-row {
  border-width: 1px 0 0 0;
  border-bottom-color: slategray;
  border-style: solid;
}
</style>