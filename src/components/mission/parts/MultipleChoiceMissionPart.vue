<template>
    <div class="flex-row mission-row">
        <span>{{description}}</span>
        <div class="flex-column text-no-wrap">
            <div v-for="(choice, index) in choices" v-bind:key="index">
                <input type="radio"
                       :id="uuid + index"
                       :name="uuid"
                       :value="index"
                       :checked="index === 0"
                       v-model="selectedIndex"
                       v-on:change="determineScore"
                >
                <label :for="uuid + index">{{choice.choice}}</label>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MultipleChoiceMissionPart",
        props: {
            description: String,
            choices: Array
        },
        data: function () {
            return {
                score: 0,
                selectedIndex: 0,
                uuid:  ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
                    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
                )
            }
        },
        methods: {
            determineScore: function () {
                let previous = this.score;
                this.score = this.choices[this.selectedIndex].score;
                if (previous !== this.score) {
                    this.$emit('score-changed', previous, this.score)
                }
            },
        }
    }
</script>

<style scoped>

</style>