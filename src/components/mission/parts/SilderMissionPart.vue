<template>
    <div class="flex-column flex-filler mission-row">
        <div class="flex-row">
            <span>{{description}}</span>
            <span class="flex-filler"></span>
            <!--  todo make sure that higher (or lower) number input on mobile are not used and adjusted in the gui   -->
            <div class="flex-row">
                <input type="number"
                       :min="min"
                       :max="max"
                       :step="1"
                       v-model.number="selectedNumber"
                       v-on:change="determineScore"
                       class="slider-number"
                />
            </div>
        </div>
        <input type="range"
               :min="min"
               :max="max"
               :step="1"
               v-model.number="selectedNumber"
               v-on:change="determineScore"
               class="slider"
        />
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
    .slider-number{
        width: 3em;
        margin-left: 8px;
    }
    .slider{
        flex-grow: 1;
        padding-top: 4px;
        padding-bottom: 4px;
    }
</style>