<template>
  <div class="flex-column form">
    <button v-on:click="remove" class="btn-danger remove-part">X</button>

    <label for="part-type">Type</label>
    <select v-model="selectedType"
            v-on:change="onSelect(selectedType)"
            id="part-type">
      <option value="CheckBox">CheckBox</option>
      <option value="MultipleChoice">MultipleChoice</option>
      <option value="Slider">Slider</option>
      <option value="ExtraPointsForEachMissionWithPoints">ExtraPointsForEachMissionWithPoints</option>
    </select>


    <template v-if="selectedType === 'CheckBox'">
      <label for="part-checkbox-text">Text</label>
      <language-string-field v-model="backingData.CheckBox.description"
                             id="part-checkbox-text"
                             :textArea="true"/>

      <label for="part-checkbox-score">Score</label>
      <input type="number"
             v-model.number="backingData.CheckBox.completionScore"
             id="part-checkbox-score"
      />

    </template>

    <template v-else-if="selectedType === 'MultipleChoice'">
      <label>Description</label>
      <language-string-field v-model="backingData.MultipleChoice.description" :text-area="true"/>

      <label>Options</label>
      <draggable v-model="backingData.MultipleChoice.choices">
        <div v-for="option in backingData.MultipleChoice.choices" v-bind:key="option.id">
          <label>Text:
            <language-string-field v-model="option.data.choice"/>
          </label>
          <label>Score: <input type="number" v-model.number="option.data.score"/></label>
          <button v-on:click="removeChoice(option.id)" class="btn-danger remove-choice">-</button>
        </div>
      </draggable>

      <button v-on:click="newChoice()">New option</button>
    </template>


    <template v-else-if="selectedType === 'Slider'" class="flex-column">
      <label>Text</label>
      <language-string-field v-model="backingData.Slider.description" :text-area="true"/>

      <label>Min: <input type="number" v-model.number="backingData.Slider.min"/></label>
      <label>Max: <input type="number" v-model.number="backingData.Slider.max"/></label>
      <label>Score per step: <input type="number" v-model.number="backingData.Slider.scorePerStep"/></label>
    </template>


    <template v-else-if="selectedType === 'ExtraPointsForEachMissionWithPoints'">
      TODO
    </template>
  </div>
</template>

<script>
import LanguageStringField from "./LanguageStringField";
import draggable from 'vuedraggable'
import {Wrapper} from "./models";

export default {
  name: "MissionPartBuilder",
  components: {LanguageStringField, draggable},
  props: {
    id: String,
    missionPartJson: Object
  },
  data: function () {
    return {
      selectedType: 'CheckBox',
      backingData: {
        CheckBox: {
          description: {},
          completionScore: 0
        },
        MultipleChoice: {
          description: {},
          choices: []
        },
        Slider: {
          description: {},
          min: 0,
          max: 0,
          scorePerStep: 0
        },
        ExtraPointsForEachMissionWithPoints: {},
      }
    }
  },
  created() {
    if (this.missionPartJson.type !== undefined) {
      this.selectedType = this.missionPartJson.type
      this.backingData[this.selectedType] = this.missionPartJson
    }
    this.onSelect(this.selectedType)
  },
  methods: {
    remove: function () {
      this.$emit('deleteMissionPart', this.missionPartJson)
    },
    onSelect: function (type) {
      // remove old fields except the id
      Object.keys(this.missionPartJson)
          .filter(value => value !== 'id')
          .forEach((key) => {
            delete this.missionPartJson[key];
          });

      // add new fields
      let backingData = this.backingData[type]
      Object.keys(backingData)
        .forEach(key => this.$set(this.missionPartJson, key, backingData[key]))

      // set the type
      this.$set(this.missionPartJson, 'type', type)

    },
    newChoice() {
      this.backingData.MultipleChoice.choices.push(new Wrapper({
        choice: {},
        score: 0
      }))
    },
    removeChoice(id) {
      this.backingData.MultipleChoice.choices = this.backingData.MultipleChoice.choices.filter(choice => choice.id !== id)
    }
  },
  watch: {
    'backingData': {
      handler: function() {
        console.log('yep')
        this.onSelect(this.selectedType)
      },
      deep:true
    }
  }
}
</script>

<style scoped>

.flex-column {
  position: relative;
}


.remove-part {
  position: absolute;
  top: 1em;
  right: 1em;
}

.remove-choice {
  border-radius: 50%;
  margin: 0 4px;
  padding: 8px;
  line-height: 0;
  font-size: 2em;

}
</style>