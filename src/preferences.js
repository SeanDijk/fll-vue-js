import Vue from "vue";

export const preferences = Vue.observable({
    language: "nl"
});

export const mutations = {
    setLanguage(language) {
        preferences.language = language;
    }
};