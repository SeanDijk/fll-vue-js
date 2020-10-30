import i18n from "@/plugins/i18n";

export default {

    getForCurrentLanguage(obj){
        return obj[i18n.locale]
    }


}