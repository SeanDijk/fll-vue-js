<template>
  <div class="scoresheet-form card">

    <div class="card-header">{{ $t('challenge.saveScoreSheetForm.title') }}</div>

    <div class="card-content scoresheet-form-content">
      <label class="form-row">{{ $t('challenge.saveScoreSheetForm.name') }}
        <input class="form-row-input" type="text" v-model="name" ref="nameInput"/>
      </label>
      <label class="form-row">{{ $t('challenge.saveScoreSheetForm.totalScore') }}
        <input class="form-row-input" type="number" disabled :value="totalScore"/>
      </label>
    </div>
    <div class="btn-bar">
      <button class="btn-text" v-on:click="onCancel()">{{ $t('challenge.saveScoreSheetForm.cancel') }}</button>
      <button class="btn-text" v-on:click="onSave()">{{ $t('challenge.saveScoreSheetForm.save') }}</button>
    </div>
  </div>
</template>

<script>
import scoresheetService from "@/services/scoresheetService";

export default {
  name: "SaveScoresheetForm",
  props: {
    totalScore: Number,
    challengeJson: Object,
  },
  data: function () {
    return {
      name: ""
    }
  },
  methods: {
    onCancel: function () {
      this.$emit('on-cancel', this.value);
    },

    onSave: function () {
      this.saveScore()
      this.$emit('on-save', this.value);
    },

    saveScore: function () {
      scoresheetService.saveScoresheet(this.name, this.totalScore, this.challengeJson)
    },

    focus(){
      this.$nextTick(() =>this.$refs["nameInput"].focus());
    }
  }
}
</script>

<style scoped>

.scoresheet-form-content {
  display: flex;
  flex-direction: column;
}

.scoresheet-form {

  max-width: 400px;
  width: 90vw;
  min-height: 100px;
  box-sizing: border-box;
}

.btn-bar {
  box-sizing: border-box;
  padding: 0 8px 8px 8px;

  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

</style>