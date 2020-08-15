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
                        v-bind:key=mission.data.id
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
    import {v4 as uuidv4} from 'uuid';

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
                // Make the id field a unique id, since this is required.
                this.missions.push({
                        data: {
                            id: uuidv4(),
                            missionParts: []
                        }
                    }
                )
            },
            deleteMission: function(id) {
                //todo generify to a deleteIf method.
                let toDelete = this.missions.filter(mission => mission.data.id === id);

                toDelete.forEach(value => {
                    this.missions.splice(this.missions.indexOf(value), 1)
                })
            },
            toJson: function () {
                let x = {
                    name: this.name,
                    missions: this.missions
                        // Get the actual data from the object
                        .map((mission) => mission.data)
                        // Convert from vue observer to the pure data
                        .map((mission) => JSON.parse(JSON.stringify(mission)))
                }
                console.log(x)
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