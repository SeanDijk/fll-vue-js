<template>
    <fieldset class="container">
        <!--        <legend>Mission</legend>-->
        <button v-on:click="remove" class="btn-danger">X</button>
<!--        <label>Id: <input id="id" v-model="id"></label>-->
        <label>Name: <language-string-field v-model="value.name"/></label>

        <div id="imgs">
            <img src="https://via.placeholder.com/150"/>
        </div>
        <button>Add image</button>


        <br>
        <b>Parts</b>
        <fieldset>
            <draggable id="missionParts" v-model="value.missionParts">
                <mission-part-builder
                        v-for="missionPart in value.missionParts"
                        v-model="missionPart.data"
                        v-bind:key=missionPart.id
                        :id="missionPart.id"
                        class="builder-mission-part"
                        @deleteMissionPart="deleteMissionPart($event)"
                />
            </draggable>
        </fieldset>

        <button v-on:click="addMissionPart">Add mission part</button>

    </fieldset>
</template>

<script>
    import draggable from 'vuedraggable'

    import MissionPartBuilder from "./MissionPartBuilder";
    import {Wrapper} from "./models";
    import LanguageStringField from "./LanguageStringField";

    export default {
        name: "MissionBuilder",
        components: {LanguageStringField, MissionPartBuilder, draggable},
        props: {
            // Used for delete
            id: String,
            value: Object
        },
        methods: {
            addMissionPart: function () {
                this.value.missionParts.push(new Wrapper({}))
            },
            deleteMissionPart: function(id) {
                this.value.missionParts = this.value.missionParts.filter(wrapper => wrapper.id !== id)
            },
            remove: function () {
                this.$emit('deleteMission', this.id)
            }
        },
        created() {
            if(this.value.name === undefined){
                this.value.name = {}
            }
        }

    }
</script>

<style scoped>

    #missionParts {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .container {
        position: relative;
    }

    .btn-danger {
        position: absolute;
        top: 1em;
        right: 1em;
    }

    .builder-mission-part{
        padding: 16px;
        /*width: 100%;*/
        border-bottom: #222222 solid 1px;
    }
    .builder-mission-part:last-child {
        border-bottom: 0;
    }
</style>