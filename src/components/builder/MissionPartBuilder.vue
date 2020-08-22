<template>
    <div class="flex-column">
        <button v-on:click="remove" class="btn-danger remove-part">X</button>

        <label>
            <select v-model="selectedType" v-on:change="onSelect(selectedType)">
                <option value="CheckBox">CheckBox</option>
                <option value="MultipleChoice">MultipleChoice</option>
                <option value="Slider">Slider</option>
                <option value="ExtraPointsForEachMissionWithPoints">ExtraPointsForEachMissionWithPoints</option>
            </select>
        </label>

        <template v-if="selectedType === 'CheckBox'">
            <label>Text: <language-string-field v-model="data.CheckBox.description" :textArea="true"/></label>
            <label>Score <input type="number" v-model="data.CheckBox.completionScore"/></label>

        </template>
        <div v-else-if="selectedType === 'MultipleChoice'">
            <draggable v-model="data.MultipleChoice.choices">
                <div v-for="option in data.MultipleChoice.choices" v-bind:key="option.id">
                    <label>Text:
                        <language-string-field v-model="option.data.choice"/>
                    </label>
                    <label>Score: <input type="number" v-model="option.data.score"/></label>
                    <button v-on:click="removeChoice(option.id)" class="btn-danger remove-choice">-</button>
                </div>
            </draggable>

            <button v-on:click="newChoice()">New option</button>
        </div>
        <div v-else-if="selectedType === 'Slider'" class="flex-column">
        <!--Todo add complex view, where score can be determined per step-->
            <label>Text: <language-string-field v-model="data.Slider.description"/></label>
            <label>Min: <input type="number" v-model="data.Slider.min"/></label>
            <label>Max: <input type="number" v-model="data.Slider.max"/></label>
            <label>Score per step: <input type="number" v-model="data.Slider.scorePerStep"/></label>
        </div>
        <div v-else-if="selectedType === 'ExtraPointsForEachMissionWithPoints'">
            TODO
        </div>
    </div>
</template>

<script>
    import LanguageStringField from "./LanguageStringField";
    import draggable from 'vuedraggable'
    import {Wrapper} from "./models";

    export default {
        name: "MissionPartBuilder",
        components: {LanguageStringField, draggable},
        data: function () {
            return {
                selectedType: 'CheckBox',
                data: {
                    CheckBox:{
                        description:{},
                        completionScore: 0
                    },
                    MultipleChoice:{
                        choices:[]
                    },
                    Slider:{
                        description: {},
                        min:0,
                        max:0,
                        scorePerStep: 0
                    },
                    ExtraPointsForEachMissionWithPoints:{},

                }
            }
        },
        props: {
            id: String,
            value: Object
        },
        methods: {
            remove: function () {
                this.$emit('deleteMissionPart', this.id)
            },
            onSelect: function (type) {
                Object.keys(this.value).forEach((key) =>{ delete this.value[key]; });
                let values = this.data[type];
                Object.keys(values).forEach((key) => {
                    this.value[key] = values[key]
                });
                this.value.type = type;

                console.log(type)
                console.log(this.value)
            },
            newChoice() {
                this.data.MultipleChoice.choices.push(new Wrapper({
                    choice: {},
                    score: 0
                }))
            },
            removeChoice(id){
                this.data.MultipleChoice.choices = this.data.MultipleChoice.choices.filter(choice => choice.id !== id)
            }
        },
        created() {this.onSelect(this.selectedType)}
    }
</script>

<style scoped>

    .flex-column {
        position: relative;
    }


    .remove-part {
        position: absolute;
        top: 1em;
        right: 1em;
    }

    .remove-choice {
        border-radius: 50%;
        margin: 0 4px;
        padding: 8px;
        line-height: 0;
        font-size: 2em;

    }
</style>