import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
    en: {
        header: {
            menu :{
                appName: "FLL Score app",
                challenges: "Challenges",
                builder: "Builder",
                language: "Language"
            }
        }
    },
    nl: {
        header: {
            menu :{
                appName: "FLL Score app",
                challenges: "Uitdagingen",
                builder: "Bouwer",
                language: "Taal"
            }
        }
    }
}


// Create VueI18n instance with options
const i18n = new VueI18n({
    locale: 'nl', // set locale
    messages, // set locale messages
})

export default i18n