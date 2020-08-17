<template>
    <div>
        <h1>Challenge builder</h1>
        <label>Name: <input id="name" v-model="name"></label>

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


        <button v-on:click="toJson">Save</button>

    </div>
</template>

<script>
    import draggable from 'vuedraggable'
    import MissionBuilder from "./MissionBuilder";
    import {Wrapper} from "./models";

    export default {
        name: "ChallengeBuilder",
        components: {MissionBuilder, draggable},
        data: function () {
            return {
                name: '',
                missions: []
            }
        },
        methods: {
            addMission: function () {
                this.missions.push(new Wrapper({missionParts:[]}))
            },
            deleteMission: function(id) {
                this.missions = this.missions.filter(wrapper => wrapper.id !== id)
            },
            toJson: function () {
                console.log(JSON.parse(JSON.stringify({
                    name: this.name,
                    missions: this.missions
                })));
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