<template>
    <div class="flex-column">
        <div class="flex-row mission-header">
            <span>{{name}}</span>
            <span>{{totalScore}}</span>
        </div>

        <div class="flex-row flex-filler">

<!--            if image-->
            <div v-if="images !== undefined && images.length > 0">
                <img class="mission-main-image"
                     :src=images[0].path
                     :alt=images[0].description
                >
            </div>
            <div ref="parts" class="flex-column flex-filler"/>

        </div>




    </div>
</template>

<script>
    import MissionPartViewFactory from "../MissionPartViewFactory";


    export default {
        name: "Mission",
        props: {
            id: String,
            name: String,
            description: String,
            missionParts: Array,
            images: Array
        },
        data: function () {
            return {
                totalScore: 0
            }
        },
        mounted: function () {

            this.missionParts.forEach((missionPartData) => {
                let instance = new MissionPartViewFactory().createMissionPartView(
                    missionPartData,
                    (previousScore, newScore) => {
                        this.totalScore = this.totalScore - previousScore + newScore;
                        this.$emit('mission-score-changed', this)
                    }
                );
                if(instance !== null) {
                    if(missionPartData.type === "ExtraPointsForEachMissionWithPoints") {
                        // todo do somthing to link it to the status of the challenge
                        // console.log(instance)
                        // instance.$props.missionsStatus = this.missionsStatus
                    }
                    this.$refs.parts.appendChild(instance.$el);
                }
            });

        }
    }
</script>

<style scoped>

</style>