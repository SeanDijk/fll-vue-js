import Vue from "vue";
import i18n from "@/plugins/i18n";

export const preferences = Vue.observable({
    language: "nl"
});

export const mutations = {
    setLanguage(language) {
        preferences.language = language;
        console.log(i18n)
        // i18n.locale = language
    }
};