<template>
    <div>
        <span>{{title}}</span>
        <div v-for="field in value.values()" v-bind:key="field.name">
            Language: {{field.name}}
            <label>Text: <input id="text"></label>
        </div>

        <button>Add language</button>
    </div>
</template>

<script>
    export default {
        name: "LanguageStringField",
        props: {
            title: String
            value: Object
        },
        data: function () {
            return {

            }
        }
    }
</script>

<style scoped>

</style>