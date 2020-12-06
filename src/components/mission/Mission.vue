<template>
  <div class="flex-column card card-size-medium">

    <header class="card-header">
      <span class="card-title">{{ this.missionJson.name | localeString }}</span>
    </header>
    <flickity
        data-flickity='{ "adaptiveHeight": true }'
        v-if="missionJson.images && missionJson.images.length > 0" class="main-carousel" ref="flickity" :options="{
          wrapAround: false,
          prevNextButtons: false
    }">
      <div class="carousel-cell" v-for="image in missionJson.images" :key="image.path">
        <button class="btn-icon open-full-screen"
                v-on:click="$refs.fsi.show(getImage(image), image.description)">
          <img src="@/assets/icons/zoom_in-24px.svg">
        </button>

        <img class="carousel-cell-image" :src=getImage(image) alt=""/>
        <span v-if="image.description && image.description.trim() !== ''"
              class="carousel-cell-image-description">{{ image.description }}</span>
      </div>
    </flickity>

    <div class="card-content">
      <div ref="parts" class="flex-column flex-filler"/>
    </div>

    <div class="flex-row flex-filler"></div>

    <div class="card-footer flex-row">
      Mission score:
      <span class="flex-filler"></span>
      {{ totalScore }}
    </div>

    <full-screen-image ref="fsi"></full-screen-image>
  </div>
</template>

<script>
import MissionPartViewFactory from "@/components/MissionPartViewFactory";
import {getImageSrc} from "@/services/imageRetriever";
import Flickity from 'vue-flickity'
import FullScreenImage from "@/components/util/FullScreenImage";

export default {
  name: "Mission",
  components: {
    FullScreenImage,
    Flickity
  },
  props: {
    challengeId: String,
    missionJson: Object,
    fromAssets: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      totalScore: 0
    }
  },
  mounted: function () {
    let factory = new MissionPartViewFactory();
    this.missionJson.missionParts.forEach((missionPartData) => {
      let instance = factory.createMissionPartView(
          missionPartData,
          (previousScore, newScore) => {
            this.totalScore = this.totalScore - previousScore + newScore;
            this.$emit('mission-score-changed', this)
          }
      );
      if (instance !== null) {
        this.$refs.parts.appendChild(instance.$el);
      }
    });

    this.$refs?.flickity?.rerender()
  },
  methods: {
    getImage(image) {
      return getImageSrc(this.fromAssets, this.challengeId, image.path)
    },
    getId() {
      if (!this.missionJson.id) {
        this.$log.error("Mission does not have an id: ", this.missionJson)
      }
      return this.missionJson.id
    }
  },
}
</script>

<style scoped>

.main-carousel {
  margin-bottom: 8px;
}

.carousel-cell {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.carousel-cell-image {
  box-sizing: border-box;
  position: relative;
  max-width: 100%;
  height: 200px;
  width: auto;
  padding-bottom: 8px;
}

.carousel-cell-image-description {
  box-sizing: border-box;
  padding: 8px;
  width: 100%;
  text-align: center;
  font-style: italic;
}

.open-full-screen {
  position: absolute;
  top: 0px;
  right: 8px;
}


</style>