<template>
    <div class="flex-column">
        <button v-on:click="remove" class="btn-danger">X</button>

        <label>
            <select v-model="selectedType">
                <option value="CheckBox">CheckBox</option>
                <option value="MultipleChoice">MultipleChoice</option>
                <option value="Slider">Slider</option>
                <option value="ExtraPointsForEachMissionWithPoints">ExtraPointsForEachMissionWithPoints</option>
            </select>
        </label>

        <template v-if="selectedType === 'CheckBox'">
            <label><textarea></textarea></label>
            <label><input type="number"></label>
        </template>
        <div v-else-if="selectedType === 'MultipleChoice'">
            <label><textarea></textarea></label>
            <div>
                <input type="text"/>
                <input type="number"/>
            </div>
        </div>
        <div v-else-if="selectedType === 'Slider'">
        <!--Todo add complex view, where score can be determined per step-->
            Min<input type="number"/>
            Max<input type="number"/>
            Score per step <input type="number"/>


        </div>
        <div v-else-if="selectedType === 'ExtraPointsForEachMissionWithPoints'">
            TODO
        </div>
    </div>
</template>

<script>
    export default {
        name: "MissionPartBuilder",
        data: function () {
            return {
                selectedType: 'CheckBox'
            }
        },
        props: {
            id: String,
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
                this.$emit('deleteMissionPart', this.id)
            }
        }
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