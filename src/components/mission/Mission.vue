<template>
  <div class="flex-column card card-size-medium">

    <header class="card-header">
      <span class="card-title">{{ this.missionJson.name | localeString }}</span>
    </header>
    <flickity
        v-if="missionJson.images && missionJson.images.length > 0" class="main-carousel" ref="flickity" :options="{
          wrapAround: false,
          prevNextButtons: false
    }">
      <div class="carousel-cell" v-for="image in missionJson.images" :key="image.path">
        <img class="carousel-cell-images" :src=getImage(image) :alt="image.description"/>
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
  </div>
</template>

<script>
import MissionPartViewFactory from "@/components/MissionPartViewFactory";
import {getImageSrc} from "@/services/imageRetriever";
import Flickity from 'vue-flickity'

export default {
  name: "Mission",
  components: {
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
    }
  },
}
</script>

<style scoped>
.main-carousel {
  height: 200px;
  margin-bottom: 8px;
}

.carousel-cell {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
}

.carousel-cell-images {
  position: relative;
  max-width: 100%;
  height: 100%;
  width: auto;
}


</style>