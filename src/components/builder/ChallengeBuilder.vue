<template>
  <div class="screen">
    <div id="builder" class="form">
      <h1>Challenge builder</h1>

      <fieldset>
        <legend><h2>Algemene informatie</h2></legend>
        <label class="form-row">Id:
          <input class="form-row-input" type="text" v-model="backingJson.id" id="challengeId"/>
        </label>
        <label class="form-row">Naam:
          <language-string-field class="form-row-input" v-model="backingJson.name" id="challengeName"/>
        </label>

        <!-- Using a label as wrapper messes with the click detection for the delete button-->
        <span class="form-row"><label for="challengeImage">Afbeelding:</label>
          <image-input class="form-row-input"
                       v-model="backingJson.logo"
                       id="challengeImage"
                       mode="single"
                       :fallback-path="backingJson.id"/>
        </span>

      </fieldset>


      <draggable v-model="backingJson.missions">
        <!-- use mission.data since passing just mission is not allowed.-->
        <mission-builder
            class="builder-mission"
            v-for="mission in backingJson.missions"
            :mission-json="mission"
            :challenge-id="backingJson.id"
            v-bind:key=mission.id
            @deleteMission="deleteMission($event)"
        />
      </draggable>

      <button class="btn-primary" v-on:click="addMission">Missie toevoegen</button>


      <button class="btn-succes" v-on:click="download">Opslaan</button>
    </div>

    <div id="preview">
      <h1>Preview</h1>
      <challenge v-if="backingJson"
                 :challengeJson="backingJson"
      >
      </challenge>
    </div>

  </div>
</template>

<script>
import MissionBuilder from "./MissionBuilder";
import LanguageStringField from "./LanguageStringField";
import Challenge from "../Challenge";
import JSZip from "jszip";
import {saveAs} from 'file-saver';
import ImageInput from "@/components/util/ImageInput";
import draggable from 'vuedraggable'
import hashService from "@/services/hashService";
import {MissionModel} from "@/models/MissionModel";
import {getImageSrc} from "@/services/imageRetriever";
import axios from "axios"


export default {
  name: "ChallengeBuilder",
  components: {ImageInput, Challenge, LanguageStringField, MissionBuilder, draggable},
  props: {
    backingJson: Object
  },
  methods: {
    addMission: function () {
      let mission = new MissionModel();
      mission.id = hashService.simpleTimebasedHash()
      this.backingJson.missions.push(mission)
    },
    deleteMission: function (id) {
      this.backingJson.missions = this.backingJson.missions.filter(mission => mission.id !== id)
    },
    download: function () {
      let zip = new JSZip();

      // Create the challenge.json
      zip.file("challenge.json", JSON.stringify(this.backingJson))

      // Get the challenge logo and add it as file
      if (this.backingJson.logo?.path) {
        this.addImageToZip(this.backingJson.logo, zip)
      }

      // Get the images from the missions and add them as files.
      this.backingJson.missions
          .flatMap(mission => mission.images)
          .forEach(img => {
            this.addImageToZip(img, zip)
          })


      //download the zip
      zip.generateAsync({type: "blob"})
          .then(value => saveAs(value, this.backingJson.id + ".zip"))
    },
    addImageToZip: function (img, zip) {
      // If the images is uploaded by the user src should be set.
      if (img.src) {
        zip.file(
            img.path,
            img.src.replace(/(data.*base64)/, ''),
            {base64: true})
      }
      // Otherwise it should be an already present image.
      else {
        let prom = axios.get(getImageSrc(this.backingJson.id, img), {responseType: 'arraybuffer'})
            .then(value => {
              return value.data
            })
        zip.file(img.path, prom)
      }
    }
  }
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


.builder-mission {
  border-bottom: #222222 solid 1px;
  padding-bottom: 16px;
  padding-top: 16px;
}


</style>