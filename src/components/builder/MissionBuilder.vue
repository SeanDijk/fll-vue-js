<template>
  <fieldset class="container form">
    <!--                <legend>Mission</legend>-->
    <button v-on:click="remove" class="btn-danger">X</button>

    <h2>Mission</h2>

    <!--        <label>Id: <input id="id" v-model="id"></label>-->
    <label for="missionName">Name: </label>
    <language-string-field v-model="value.name" id="missionName"/>


    <label for="missionImgs">Images</label>
    <draggable id="imgs" v-model="value.images">
      <div v-for="img in value.images"
           v-bind:key="img.id"
           class="mission-img-wrapper">
        <button v-on:click="removeImg(img)" class="btn-danger">X</button>
        <img :src="img.src" class="mission-img"/>
      </div>
    </draggable>
    <input type="file"
           id="missionImgs"
           ref="file"
           accept="image/*"
           multiple
           v-on:change="handleFileUpload()"/>


    <br>
    <b>Parts</b>
    <fieldset>
      <draggable id="missionParts" v-model="value.missionParts">
        <mission-part-builder
            v-for="missionPart in value.missionParts"
            v-model="missionPart.data"
            v-bind:key=missionPart.id
            :id="missionPart.id"
            class="builder-mission-part"
            @deleteMissionPart="deleteMissionPart($event)"
        />
      </draggable>
    </fieldset>

    <button v-on:click="addMissionPart">Add mission part</button>

  </fieldset>
</template>

<script>
import draggable from 'vuedraggable'

import MissionPartBuilder from "./MissionPartBuilder";
import {Wrapper} from "./models";
import LanguageStringField from "./LanguageStringField";

export default {
  name: "MissionBuilder",
  components: {LanguageStringField, MissionPartBuilder, draggable},
  props: {
    // Used for delete
    id: String,
    value: Object,
  },
  methods: {
    addMissionPart() {
      this.value.missionParts.push(new Wrapper(new Wrapper({})))
    },
    deleteMissionPart(id) {
      this.value.missionParts = this.value.missionParts.filter(wrapper => wrapper.id !== id)
    },
    handleFileUpload() {
      this.$refs.file.files.forEach(img => {
        let wrapped = new Wrapper({path: img.name})
        wrapped.src = require('../../assets/pendulum.gif');

        this.value.images.push(wrapped)

        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = e => {
          wrapped.src = e.target.result;
        };
      })
    },
    removeImg(imgWrapper) {
      this.value.images = this.value.images.filter(value => value.id !== imgWrapper.id)
    },
    remove() {
      this.$emit('deleteMission', this.id)
    }
  },
  created() {
    if (this.value.name === undefined) {
      this.value.name = {}
    }
  }

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

.btn-danger {
  position: absolute;
  top: 1em;
  right: 1em;
}

.builder-mission-part {
  padding: 16px;
  /*width: 100%;*/
  border-bottom: #222222 solid 1px;
}

.builder-mission-part:last-child {
  border-bottom: 0;
}

#imgs {
  display: flex;
  flex-direction: row;
}

.mission-img-wrapper {
  position: relative;
  height: 150px;
  width: 150px;
  background: lightgray;

  display: flex;
  justify-content: center;
}

.mission-img {
  width: auto;
  max-width: 100%;
  height: auto;
  max-height: 100%;
}
</style>