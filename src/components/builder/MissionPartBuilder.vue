<template>
    <div>
        <label>Type
            <select v-model="selectedType">
                <option value="CheckBox">CheckBox</option>
                <option value="MultipleChoice">MultipleChoice</option>
                <option value="Slider">Slider</option>
                <option value="ExtraPointsForEachMissionWithPoints">ExtraPointsForEachMissionWithPoints</option>
            </select>
        </label>

        <div v-if="selectedType === 'CheckBox'">

        </div>
        <div v-else-if="selectedType === 'MultipleChoice'">

        </div>
        <div v-else-if="selectedType === 'Slider'">

        </div>
        <div v-else-if="selectedType === 'ExtraPointsForEachMissionWithPoints'">

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
            value: Object
        },

    }
</script>

<style scoped>

</style>