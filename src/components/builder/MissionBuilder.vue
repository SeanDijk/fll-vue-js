<template>
    <fieldset class="container">
        <legend>Mission</legend>
        <button v-on:click="remove" class="btn-danger">X</button>

        <label>Name: <input id="name" v-model="value.name"></label>

        <br>
        <b>Parts</b>
        <div id="missionParts">
            <draggable v-model="value.missionParts">
                <!-- use missionPart.data since passing just mission is not allowed.-->
                <mission-part-builder
                        v-for="missionPart in value.missionParts"
                        v-model="missionPart.data"
                        v-bind:key=missionPart.data.id
                />
            </draggable>



        </div>

        <div id="imgs"></div>

        <button>Add image</button>
        <button v-on:click="addMissionPart">Add mission part</button>

    </fieldset>
</template>

<script>
    import draggable from 'vuedraggable'

    import MissionPartBuilder from "./MissionPartBuilder";
    export default {
        name: "MissionBuilder",
        components: {MissionPartBuilder, draggable},
        props: {
            value: Object
        },
        methods: {
            addMissionPart: function () {
                // Make the id field a unique id, since this is required.
                this.value.missionParts.push({
                        data: {}
                    }
                )
            },
            remove: function () {
                this.$emit('deleteMission', this.value.id)
            }
        }
    }
</script>

<style scoped>
    .container {
        position: relative;
    }
    .btn-danger{
        position: absolute;
        top: 1em;
        right: 1em;
    }
</style>