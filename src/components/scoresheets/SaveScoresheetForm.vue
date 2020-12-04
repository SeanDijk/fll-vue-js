<template>
  <div class="scoresheet-form card">

    <div class="card-header">Save scoresheet?</div>

    <div class="card-content scoresheet-form-content">
      <label class="form-row">Name        <input class="form-row-input" type="text" v-model="name"/></label>
      <label class="form-row">Total score <input class="form-row-input" type="number" disabled :value="totalScore"/></label>
    </div>
    <div class="btn-bar">
      <button class="btn-text" v-on:click="onCancel()">Cancel</button>
      <button class="btn-text" v-on:click="onSave()">Save</button>
    </div>
  </div>
</template>

<script>
import scoresheetService from "@/services/scoresheetService";

export default {
  name: "SaveScoresheetForm",
  props:{
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
      //  todo open toast message on succes
    },

    saveScore: function () {
      scoresheetService.saveScoresheet(this.name, this.totalScore, this.challengeJson)
    }
  }
}
</script>

<style scoped>

.scoresheet-form-content{
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

.form-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
}
.form-row:last-child{
  padding-bottom: 0;
}

.form-row-input {
  flex-grow: 1;
  max-width: 70%;
}

</style>