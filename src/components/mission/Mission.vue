<template>
    <div class="flex-column card card-size-medium">

        <header class="card-header">
            <span class="card-title">{{getName}}</span>
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
            {{totalScore}}
        </div>
    </div>
</template>

<script>
    import MissionPartViewFactory from "../MissionPartViewFactory";
    import { preferences } from "../../preferences";

    export default {
        name: "Mission",
        props: {
            id: String,
            name: Object,
            description: Object,
            missionParts: Array,
            images: Array,
        },
        data: function () {
            return {
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
                if(instance !== null) {
                    this.$refs.parts.appendChild(instance.$el);
                }
            });

        },
        methods:  {
            getImage(index) {
                return require(`@/assets/challenges/${this.$route.params.id}/${this.images[index].path}`)
            }
        },
        computed: {
            getName(){
                return this.name?.[preferences.language];
            },
            getDescription(){
                return this.description?.[preferences.language];
            }
        },
    }
</script>

<style scoped>

</style>