<template>
  <div class="screen">
    <!--        <button v-on:click="log">log</button>-->
    <!--        <label>Preview<input type="checkbox" v-model="preview"></label>-->

    <div id="builder" class="form">
      <h1>Challenge builder</h1>

      <label for="challengeId">ID:</label>
      <input type="text" v-model="id" id="challengeId"/>


      <label for="challengeName">Name:</label>
      <language-string-field v-model="name" id="challengeName"/>

      <div id="newMissions">
        <draggable v-model="missions">
          <!-- use mission.data since passing just mission is not allowed.-->
          <mission-builder
              v-for="mission in missions"
              v-model="mission.data"
              v-bind:key=mission.id
              :id="mission.id"
              :images="mission.images"
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
  data: function () {
    return {
      previewData: undefined,
      previewDataKey: 0,
      name: {},
      id: '',
      missions: [],
    }
  },
  methods: {
    addMission: function () {
      this.missions.push(new Wrapper({missionParts: [], images: []}))
    },
    deleteMission: function (id) {
      this.missions = this.missions.filter(wrapper => wrapper.id !== id)
    },
    download: function () {
      //todo also export images etc.

      const data = JSON.stringify({
        name: this.name,
        missions: this.missions
      });


      let zip = new JSZip();
      zip.file("challenge.json", data)

      // get all the images

      console.log(this.missions)
      this.missions
          .flatMap(mission => mission.data.images)
          .forEach(imgWrapper => zip.file(
              imgWrapper.data.path,
              imgWrapper.src.replace('data:image/png;base64,', ''),
              {base64: true}))
      // .forEach(imgWrapper => console.log(imgWrapper.src))


      zip.generateAsync({type: "blob"})
          .then(value => saveAs(value, this.id + ".zip"))
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