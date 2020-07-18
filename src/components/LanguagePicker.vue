<template>
    <div>
        | Language:
        <select v-model="selectedLanguage" v-on:change="setLanguage(selectedLanguage)">
            <option v-for="language in supportedLanguages"
                    :value="language"
                    v-bind:key="language"
            >{{language}}</option>
        </select>
    </div>
</template>

<script>
    import {preferences, mutations} from "../preferences";

    export default {
        name: "LanguagePicker",
        computed: {
            getLanguage() {
                return preferences.language;
            }
        },
        methods: {
            setLanguage: mutations.setLanguage
        },
        data: function() {
            return {
                selectedLanguage: preferences.language,
                supportedLanguages: [
                    "nl", "en"
                ]
            }
        },
    }

</script>

<style scoped>

</style>