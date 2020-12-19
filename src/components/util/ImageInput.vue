<template>

  <div>
    <draggable v-if="!isSingle()" id="imgs" :list="value">
      <div v-for="img in value"
           v-bind:key="img.path"
           class="mission-img-wrapper">
        <button v-on:click="removeImg(img)" class="btn-danger">X</button>
        <img :src="img.src" class="mission-img"/>
        <textarea class="description-input"
                  maxlength="1000"
                  placeholder="Description..."
                  v-model="img.description"
        />
      </div>
    </draggable>

    <div v-else-if="value.src">
      <div class="mission-img-wrapper">
        <img :src="value.src" class="mission-img"/>
        <button v-on:click.stop="removeImg(value)" class="btn-danger">X</button>
        <textarea
            class="description-input"
            maxlength="1000"
            placeholder="Description..."
            v-model="value.description"
        />
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

        if (this.isSingle()) {
          this.value.path = img.name
          this.value.src = require('@/assets/pendulum.gif')
          reader.readAsDataURL(img);
          reader.onload = e => {
            this.$set(this.value, 'src', e.target.result);
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
      if (this.isSingle()) {
        this.$set(this.value, 'src', null);
      } else {
        this.value.splice(this.value.findIndex(value => value === imgWrapper), 1);
      }
    }
  }
}
</script>

<style scoped>

.mission-img {
  height: 150px;
  width: 150px;
}

.mission-img-wrapper {
  display: flex;
  flex-direction: column;
  max-width: 150px;

  position: relative;
  background: lightgray;

  justify-content: center;
}


#imgs {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.description-input {
  max-width: 100%;
  height: auto;
  min-height: 1em;
}

.btn-danger {
  /*todo global class for right corner*/
  position: absolute;
  top: 1em;
  right: 1em;
}
</style>