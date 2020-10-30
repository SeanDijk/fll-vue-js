import {preferences} from "@/preferences";

export default {

    getForCurrentLanguage(obj){
        return obj[preferences.language]
    }


}