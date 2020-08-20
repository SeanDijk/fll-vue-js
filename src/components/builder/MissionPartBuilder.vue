<template>
    <div class="flex-column">
        <button v-on:click="remove" class="btn-danger">X</button>

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
<!--            <div>-->
<!--                <label>Text: <language-string-field v-model="name"/></label>-->
<!--                <label>Score <input type="number"/></label>-->
<!--            </div>-->
<!--            todo add/remove options-->
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
    export default {
        name: "MissionPartBuilder",
        components: {LanguageStringField},
        data: function () {
            return {
                selectedType: 'CheckBox',
                data: {
                    CheckBox:{
                        description:{},
                        completionScore: 0
                    },
                    MultipleChoice:{},
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
            }
        },
        created() {this.onSelect(this.selectedType)}
    }
</script>

<style scoped>

    .flex-column {
        position: relative;
    }


    .btn-danger {
        position: absolute;
        top: 1em;
        right: 1em;
    }
</style>