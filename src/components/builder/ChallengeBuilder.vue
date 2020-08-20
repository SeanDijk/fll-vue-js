<template>
    <div>
        <h1>Challenge builder</h1>
        <label>Name: <language-string-field v-model="name"/></label>

        <div id="newMissions">
            <draggable v-model="missions">
                <!-- use mission.data since passing just mission is not allowed.-->
                <mission-builder
                        v-for="mission in missions"
                        v-model="mission.data"
                        v-bind:key=mission.id
                        :id="mission.id"
                        @deleteMission="deleteMission($event)"
                />
            </draggable>
        </div>


        <button v-on:click="addMission">Add mission</button>


        <button v-on:click="download">Save</button>

    </div>
</template>

<script>
    import draggable from 'vuedraggable'
    import MissionBuilder from "./MissionBuilder";
    import {Wrapper} from "./models";
    import {downloadBlob} from "../../util";
    import LanguageStringField from "./LanguageStringField";

    export default {
        name: "ChallengeBuilder",
        components: {LanguageStringField, MissionBuilder, draggable},
        data: function () {
            return {
                name: {},
                missions: [],
            }
        },
        methods: {
            addMission: function () {
                this.missions.push(new Wrapper({missionParts:[]}))
            },
            deleteMission: function(id) {
                this.missions = this.missions.filter(wrapper => wrapper.id !== id)
            },
            download: function () {
                //todo also export images etc.

                const data = JSON.stringify({
                    name: this.name,
                    missions: this.missions
                });
                console.log(data);
                downloadBlob(new Blob([data], {type: 'text/plain'}), this.name+".json")
            },
            open: function () {
                //todo open a challenge
            }
        }


    }


</script>

<style scoped>
    #newMissions {
        padding: 8px;
    }

    .builder-part-row {
        border-width: 1px 0 0 0;
        border-bottom-color: slategray;
        border-style: solid;
    }
</style>