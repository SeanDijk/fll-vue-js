<template>
<select v-model="globalInputLanguage" v-on:change="onchange()">
  <option v-for="locale in options" v-bind:key="locale">{{locale}}</option>
</select>
</template>

<script>
import {store} from "@/preferences";
import i18n from "@/plugins/i18n";

export default {
  name: "LanguageStringFieldConfig",
  data: function (){
    return {
      globalInputLanguage: store.state.inputLanguage,
      options: i18n.availableLocales
    }
  },
  methods: {
    onchange() {
      store.setGlobalInputLanguage(this.globalInputLanguage)
    }
  }
}
</script>

<style scoped>

</style>