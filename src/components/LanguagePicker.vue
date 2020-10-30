<template>
    <div>
      {{ $t('header.menu.language') }}:
        <select v-model="selectedLanguage" v-on:change="setLanguage(selectedLanguage)">
            <option v-for="language in supportedLanguages"
                    :value="language"
                    v-bind:key="language"
            >{{language}}</option>
        </select>
    </div>
</template>

<script>
    import i18n from "@/plugins/i18n";

    export default {
        name: "LanguagePicker",
        methods: {
            setLanguage: (ln) => i18n.locale = ln
        },
        data: function() {
            return {
                selectedLanguage: i18n.locale,
                supportedLanguages: [
                    "nl", "en"
                ]
            }
        },
    }

</script>

<style scoped>

</style>