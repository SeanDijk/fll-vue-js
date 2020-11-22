import Vue from 'vue'
import i18nService from "@/services/i18nService";

Vue.filter('localeString', (obj) => i18nService.getForCurrentLanguage(obj) )