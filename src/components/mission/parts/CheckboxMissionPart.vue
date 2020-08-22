<template>
    <div class="flex-row mission-row checkbox-mission-row">
        <label for="checkbox-part">{{getDescription}}</label>
        <input v-model="checked" v-on:change="determineScore" id="checkbox-part" type="checkbox">
    </div>
</template>

<script>

    import {preferences} from "../../../preferences";

    export default {
        name: "CheckboxMissionPart",
        props: {
            description: Object,
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
        },
        computed: {
            getDescription(){ return this.description?.[preferences.language]; }
        }

    }
</script>

<style scoped>
    .checkbox-mission-row{
        align-items: center;
    }
</style>