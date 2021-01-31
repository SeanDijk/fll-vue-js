import Vue from "vue";
import i18n from "@/plugins/i18n";

export const store = Vue.observable({
    state: {
        inputLanguage: i18n.locale
    },
    setGlobalInputLanguage(languageCode) {
        this.state.inputLanguage = languageCode;

    }
});