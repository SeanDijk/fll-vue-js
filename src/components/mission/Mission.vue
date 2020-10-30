<template>
  <div class="flex-column card card-size-medium">

    <header class="card-header">
      <span class="card-title">{{ i18nService.getForCurrentLanguage(this.name) }}</span>
    </header>

    <div v-if="images !== undefined && images.length > 0" class="card-img">
      <img class="mission-main-image"
           :src=getImage(0)
           :alt=images[0].description
      >
    </div>


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
import MissionPartViewFactory from "../MissionPartViewFactory";
import {getImageSrc} from "@/imageRetriever";
import i18nService from "@/services/i18nService";

export default {
  name: "Mission",
  props: {
    id: String,
    name: Object,
    description: Object,
    missionParts: Array,
    images: Array,
    fromAssets: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      i18nService: i18nService,
      totalScore: 0
    }
  },
  mounted: function () {
    let factory = new MissionPartViewFactory();
    this.missionParts.forEach((missionPartData) => {
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

  },
  methods: {
    getImage(index) {
      return getImageSrc(this.fromAssets, this.$route.params.id, this.images[index].path)
    }
  },
}
</script>

<style scoped>

</style>