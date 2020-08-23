<template>
    <div>
        <div class="flex-row missions">
            <mission
                    v-for="mission in missions"
                    v-bind:key=mission.id
                    :id=mission.id
                    :name=mission.name
                    :description=mission.description
                    :missionParts=mission.missionParts
                    :images=mission.images
                    :from-assets="fromAssets"
                    v-on:mission-score-changed="onMissionScoreChanged"
                    class="mission"
            />
        </div>


        <div class="sticky-bottom">
            Total score: {{totalScore}}
        </div>
    </div>
</template>

<script>
    import Mission from "./mission/Mission";
    import { EventBus } from "../event-bus.js"
    export default {
        name: "Challenge",
        components: {Mission},
        props: {
            name: Object,
            description: Object,
            missions: Array,
            fromAssets: {
                type: Boolean,
                default: false
            }
        },
        data: function () {
            return {
                totalScore: 0,
                missionsStatus: {}
            }
        },
        methods: {
            onMissionScoreChanged: function (mission) {
                let oldMissionScore = this.missionsStatus[mission.id];
                if(oldMissionScore === undefined) {
                    oldMissionScore = 0;
                }

                this.missionsStatus[mission.id] = mission.totalScore;
                this.totalScore = this.totalScore - oldMissionScore + mission.totalScore;
                EventBus.$emit("mission-score", mission.id, oldMissionScore, mission.totalScore)
            }
        }
    }
</script>

<style scoped>
    .sticky-bottom {
        position: sticky;
        bottom: 0;
        background-color: #4caf50;
        padding: 16px;
        text-align: center;
    }

    .missions {
        flex-wrap: wrap;
        justify-content: space-evenly;
        /*align-items: center;*/
    }

    .mission {
        flex-grow: 1;
    }
</style>