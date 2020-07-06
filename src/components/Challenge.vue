<template>
    <div>
        <mission
                v-for="mission in missions"
                v-bind:key=mission.id
                :id=mission.id
                :name=mission.name
                :description=mission.description
                :missionParts=mission.missionParts
                :images=mission.images
                v-on:mission-score-changed="onMissionScoreChanged"
        />

        <div class="sticky-bottom mission-header">
            Totals score: {{totalScore}}
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
            name: String,
            description: String,
            missions: Array
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
        background-color: #42b983;
    }
</style>