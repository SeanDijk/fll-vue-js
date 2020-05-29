<template>
    <div class="flex-row flex-filler mission-row">
        <span>{{description}}</span>
        <div class="flex-row">
            <input type="number"
                   :min="min"
                   :max="max"
                   :step="1"
                   v-model.number="selectedNumber"
                   v-on:change="determineScore"
            />
            <input type="range"
                   :min="min"
                   :max="max"
                   :step="1"
                   v-model.number="selectedNumber"
                   v-on:change="determineScore"
            />
        </div>
    </div>
</template>

<script>
    export default {
        name: "SilderMissionPart",
        props: {
            description: String,
            min: Number,
            max: Number,
            scoreMap: Object,
        },
        data: function() {
            return {
                score: 0,
                selectedNumber: 0
            }
        },
        methods: {
            determineScore: function () {
                console.log(this.selectedNumber)
                let previous = this.score;
                this.score = this.scoreMap[this.selectedNumber]

                if(previous !== this.score) {
                    this.$emit('score-changed', previous, this.score)
                }
            }
        }
    }
</script>

<style scoped>

</style>