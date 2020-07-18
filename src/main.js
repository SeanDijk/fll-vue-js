import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.config.productionTip = false

import "@/assets/main.css"
import HelloWorld from "./components/HelloWorld";
import Challenge from "./components/Challenge";

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/test', component: Challenge, props: {
      "name": {
        "nl": "Challenge 2019"
      },
      "language": "nl",
      "missions": [
        {
          "id": "M00",
          "name": {
            "nl": "Voordeel"
          },
          "description": {
            "nl": ""
          },
          "missionParts": [
            {
              "type": "ExtraPointsForEachMissionWithPoints",
              "description": {
                "nl": "De robot en uitrusting past in het kleine inspectiegebied"
              },
              "scorePerCompletion": 5,
              "exceptions": {
                "M00": 0,
                "M14": 0,
                "M02": 10
              }
            }
          ]
        },
        {
          "id": "M01",
          "name": {
            "nl": "M01 - Verhoogde Plaatsen"
          },
          "description": {
            "nl": ""
          },
          "images": [
            {
              "path": "/mission-img/2019-2020/m01.png",
              "description": ""
            }
          ],
          "missionParts": [
            {
              "type": "CheckBox",
              "description": {
                "nl": "De robot wordt ondersteund door de brug"
              },
              "completionScore": 20
            },
            {
              "type": "Slider",
              "description": {
                "nl": "Aantal duidelijk op enige afstand opgeheven vlaggen, alleen door de robot"
              },
              "min": 0,
              "max": 2,
              "scoreMap": {
                "0": 0,
                "1": 15,
                "2": 30
              }
            }
          ]
        },
        {
          "id": "M02",
          "name": {
            "nl": "M02 - Hijskraan"
          },
          "description": {
            "nl": ""
          },
          "images": [
            {
              "path": "/mission-img/2019-2020/m02.png",
              "description": "Duidelijk verlaagd"
            },
            {
              "path": "2019-2020/m02-1.png",
              "description": "Ondersteund door andere blauwe unit"
            },
            {
              "path": "2019-2020/m02-2.png",
              "description": "Niveau volledig in blauwe cirkel"
            }
          ],
          "missionParts": [
            {
              "type": "CheckBox",
              "description": {
                "nl": "De aangehaakte blauwe unit is duidelijk verlaagd op enige afstand van het geleidegat"
              },
              "completionScore": 20
            },
            {
              "type": "CheckBox",
              "description": {
                "nl": "De aangehaakte blauwe unit is onafhankelijk en wordt ondersteund door een andere blauwe unit"
              },
              "completionScore": 15
            },
            {
              "type": "CheckBox",
              "description": {
                "nl": "EN niveau 1 is volledig in de blauwe cirkel"
              },
              "completionScore": 15
            }
          ]
        },
        {
          "id": "M03",
          "name": {
            "nl": "M03 - Inspectie Drone"
          },
          "description": {
            "nl": ""
          },
          "missionParts": [
            {
              "type": "CheckBox",
              "description": {
                "nl": "De inspectie drone wordt ondersteund door de as op de brug"
              },
              "completionScore": 10
            }
          ]
        },
        {
          "id": "M04",
          "name": {
            "nl": "M04 - Ontwerp voor dieren in het wild"
          },
          "description": {
            "nl": ""
          },
          "missionParts": [
            {
              "type": "CheckBox",
              "description": {
                "nl": "De vleermuis wordt ondersteund door de boomtak"
              },
              "completionScore": 10
            }
          ]
        },
        {
          "id": "M05",
          "name": {
            "nl": "M05 - Boomhut"
          },
          "description": {
            "nl": ""
          },
          "missionParts": [
            {
              "type": "Slider",
              "description": {
                "nl": "Aantal units dat onafhankelijk is en wordt ondersteund door de grote boomtakken"
              },
              "min": 0,
              "max": 17,
              "scoreMap": {
                "0": 0,
                "1": 10,
                "2": 20,
                "3": 30,
                "4": 40,
                "5": 50,
                "6": 60,
                "7": 70,
                "8": 80,
                "9": 90,
                "10": 100,
                "11": 110,
                "12": 120,
                "13": 130,
                "14": 140,
                "15": 150,
                "16": 160,
                "17": 170
              }
            },
            {
              "type": "Slider",
              "description": {
                "nl": "Aantal units dat onafhankeljik is en wordt ondersteund door de kleine boomtakken"
              },
              "min": 0,
              "max": 17,
              "scoreMap": {
                "0": 0,
                "1": 15,
                "2": 30,
                "3": 45,
                "4": 60,
                "5": 75,
                "6": 90,
                "7": 105,
                "8": 120,
                "9": 135,
                "10": 150,
                "11": 165,
                "12": 180,
                "13": 195,
                "14": 210,
                "15": 225,
                "16": 240,
                "17": 255
              }
            }
          ]
        },
        {
          "id": "M06",
          "name": {
            "nl": "M06 - Verkeersopstopping"
          },
          "description": {
            "nl": ""
          },
          "missionParts": [
            {
              "type": "CheckBox",
              "description": {
                "nl": "De verkeersopstopping staat omhoog, zijn bewegende deel is onafhankelijk en alleen ondersteund door zijn scharnieren"
              },
              "completionScore": 10
            }
          ]
        },
        {
          "id": "M07",
          "name": {
            "nl": "M07 - Schommel"
          },
          "description": {
            "nl": ""
          },
          "missionParts": [
            {
              "type": "CheckBox",
              "description": {
                "nl": "De schommel is vrijgegeven"
              },
              "completionScore": 20
            }
          ]
        },
        {
          "id": "M08",
          "name": {
            "nl": "M08 - Lift"
          },
          "description": {
            "nl": ""
          },
          "missionParts": [
            {
              "type": "MultipleChoice",
              "description": {
                "nl": "De bewegende delen van de lift zijn onafhankelijk en alleen ondersteund door zijn scharnieren, in de volgende positie"
              },
              "choices": [
                {
                  "choice": "Geen",
                  "score": 0
                },
                {
                  "choice": "Blauwe wagen omlaag",
                  "score": 15
                },
                {
                  "choice": "In evenwicht",
                  "score": 20
                }
              ]
            }
          ]
        },
        {
          "id": "M09",
          "name": {
            "nl": "M09 - Veiligheidsfactor"
          },
          "description": {
            "nl": ""
          },
          "missionParts": [
            {
              "type": "CheckBox",
              "description": {
                "nl": "Het testgebouw is onafhankelijk en wordt alleen ondersteund door de blauwe balken"
              },
              "completionScore": 20
            },
            {
              "type": "Slider",
              "description": {
                "nl": "Hoeveel balken zijn tenminste halverwege omgeduwd?"
              },
              "min": 0,
              "max": 6,
              "scoreMap": {
                "0": 0,
                "1": 10,
                "2": 20,
                "3": 30,
                "4": 40,
                "5": 50,
                "6": 60
              }
            }
          ]
        },
        {
          "id": "M10",
          "name": {
            "nl": "M10 - Staalconstructie"
          },
          "description": {
            "nl": ""
          },
          "missionParts": [
            {
              "type": "CheckBox",
              "description": {
                "nl": "De staalconstructie staat, en is onafhankelijk en wordt alleen ondersteund door zijn scharnieren"
              },
              "completionScore": 20
            }
          ]
        },
        {
          "id": "M11",
          "name": {
            "nl": "M11 - Innovatieve architectuur"
          },
          "description": {
            "nl": ""
          },
          "missionParts": [
            {
              "type": "CheckBox",
              "description": {
                "nl": "De constructie is groter dan een blauwe gebouwunit en is gebouwd van de team’s witte LEGO stenen"
              },
              "completionScore": 20
            },
            {
              "type": "MultipleChoice",
              "description": {
                "nl": "De constructie is in een willekeurige cirkel"
              },
              "choices": [
                {
                  "choice": "Nee",
                  "score": 0
                },
                {
                  "choice": "Gedeeltelijk",
                  "score": 10
                },
                {
                  "choice": "Volledig",
                  "score": 15
                }
              ]
            }
          ]
        },
        {
          "id": "M12",
          "name": {
            "nl": "M12 - Ontwerp & bouw"
          },
          "description": {
            "nl": ""
          },
          "missionParts": [
            {
              "type": "Slider",
              "description": {
                "nl": "Aantal cirkels met kleur overeenstemmende unit, vlak op de mat, en volledig in cirkel"
              },
              "min": 0,
              "max": 3,
              "scoreMap": {
                "0": 0,
                "1": 10,
                "2": 20,
                "3": 30
              }
            },
            {
              "type": "Slider",
              "description": {
                "nl": "Som van hoogteniveaus van onafhankeljik stapels, tenminste gedeeltelijk in een willekeurige cirkel"
              },
              "min": 0,
              "max": 30,
              "scoreMap": {
                "0": 0,
                "1": 5,
                "2": 10,
                "3": 15,
                "4": 20,
                "5": 25,
                "6": 30,
                "7": 35,
                "8": 40,
                "9": 45,
                "10": 50,
                "11": 55,
                "12": 60,
                "13": 65,
                "14": 70,
                "15": 75,
                "16": 80,
                "17": 85,
                "18": 90,
                "19": 95,
                "20": 100,
                "21": 105,
                "22": 110,
                "23": 115,
                "24": 120,
                "25": 125,
                "26": 130,
                "27": 135,
                "28": 140,
                "29": 145,
                "30": 150
              }
            }
          ]
        },
        {
          "id": "M13",
          "name": {
            "nl": "M13 - Duurzaamheidupgrades"
          },
          "description": {
            "nl": ""
          },
          "missionParts": [
            {
              "type": "Slider",
              "description": {
                "nl": "Aantal upgrades dat onafhankelijk is en alleen wordt ondersteund door een stapel die zich tenminste gedeeltelijk in een cirkel bevindt"
              },
              "min": 0,
              "max": 3,
              "scoreMap": {
                "0": 0,
                "1": 10,
                "2": 20,
                "3": 30
              }
            }
          ]
        },
        {
          "id": "M14",
          "name": {
            "nl": "M14 - Precisie"
          },
          "description": {
            "nl": ""
          },
          "missionParts": [
            {
              "type": "Slider",
              "description": {
                "nl": "Aantal op het veld overgebleven precisietekens"
              },
              "min": 0,
              "max": 6,
              "scoreMap": {
                "0": 0,
                "1": 5,
                "2": 10,
                "3": 20,
                "4": 30,
                "5": 45,
                "6": 60
              }
            }
          ]
        }
      ],
      "totalChallengeScore": 0
    }
    },

]


const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
