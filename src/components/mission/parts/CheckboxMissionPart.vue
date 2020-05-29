<template>
    <div class="flex-row mission-row">
        <label for="checkbox-part">{{description}}</label>
        <input v-model="checked" v-on:change="determineScore" id="checkbox-part" type="checkbox">
    </div>
</template>

<script>
    export default {
        name: "CheckboxMissionPart",
        props: {
            description: String,
            completionScore: Number,
        },
        data: function() {
            return {
                score: 0,
                checked: false
            }
        },
        methods: {
            determineScore: function () {
                let previous = this.score;
                this.score = this.checked * this.completionScore;

                if(previous !== this.score) {
                    this.$emit('score-changed', previous, this.score)
                }
            }
        }

    }
</script>

<style scoped>

</style>