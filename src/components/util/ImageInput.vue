<template>

  <div>
    <draggable v-if="!isSingle()" id="imgs" :list="value">
      <div v-for="img in value"
           v-bind:key="img.path"
           class="mission-img-wrapper">
        <button v-on:click="removeImg(img)" class="btn-danger">X</button>
        <img :src="img.src" class="mission-img"/>
      </div>
    </draggable>

    <div v-else-if="value.src">
      <div class="mission-img-wrapper">
        <img :src="value.src" class="mission-img"/>
        <button v-on:click.stop="removeImg(value)" class="btn-danger">X</button>
      </div>

    </div>

    <input type="file"
           id="missionImgs"
           ref="file"
           accept="image/*"
           :multiple="!isSingle()"
           v-on:change="handleFileUpload()"/>
  </div>


</template>

<script>
import draggable from 'vuedraggable'
import {ImageWrapper} from "@/models/ImageWrapper";

export default {
  name: "ImageInput",
  components: {draggable},
  props: {
    value: {
      type: [ImageWrapper, Array],
    },
    mode: {
      type: String,
      validator: (val) => ["single", "multiple"].includes(val)
    }
  },
  data: function () {
    return {
      content: this.value
    }
  },
  methods: {
    isSingle() {
      return this.mode === "single"
    },
    handleFileUpload() {
      this.$refs.file.files.forEach(img => {
        const reader = new FileReader();

        if(this.isSingle()){
          this.value.path = img.name
          this.value.src = require('@/assets/pendulum.gif')
          reader.readAsDataURL(img);
          reader.onload = e => {
            this.$set(this.value, 'src', e.target.result) ;
          };

        } else {
          let imgObj = new ImageWrapper(img.name, require('@/assets/pendulum.gif'))
          this.value.push(imgObj)

          reader.readAsDataURL(img);
          reader.onload = e => {
            imgObj.src = e.target.result;
          };
        }
      })
    },
    removeImg(imgWrapper) {
      if(this.isSingle()) {
        this.$set(this.value, 'src', null) ;
      } else {
        this.value.splice(this.value.findIndex(value => value === imgWrapper),1);
      }
    }
  }
}
</script>

<style scoped>

.test{
  width: 100px;
  height: 100px;
  background-color: #4caf50;
}

.mission-img {
  width: auto;
  max-width: 100%;
  height: auto;
  max-height: 100%;
}

.mission-img-wrapper {
  position: relative;
  height: 150px;
  width: 150px;
  background: lightgray;

  display: flex;
  justify-content: center;
}


#imgs {
  display: flex;
  flex-direction: row;
}


.btn-danger {
  /*todo global class for right corner*/
  position: absolute;
  top: 1em;
  right: 1em;
}
</style>