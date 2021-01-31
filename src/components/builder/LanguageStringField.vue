<template>
  <div class="lang-str-field">
    <select v-model="selectedLanguage">
      <option v-for="language in supportedLanguages" v-bind:key="language.id" :value="language.code">
        {{ language.name }}
      </option>
    </select>
    <input v-if="textArea !== true" v-model="value[selectedLanguage]">
    <div class="text-area-container" v-else>
      <textarea v-model="value[selectedLanguage]"/>
    </div>
  </div>
</template>

<script>
import {store} from "@/preferences";

export default {
  name: "LanguageStringField",
  props: {
    value: {
      type: Object,
      default: function() {return {}},
    },
    textArea: Boolean
  },
  data: function () {
    const lang = [
      {code: "nl", name: "Nederlands"},
      {code: "en", name: "English"}
    ]
    return {
      //todo central place for supported languages
      supportedLanguages: lang,
      selectedLanguage: store.state.inputLanguage,
      globalState: store.state
    }
  },
  watch: {
    "globalState.inputLanguage": function (val) {
      this.selectedLanguage = val
    },
  },
}
</script>

<style scoped>
.lang-str-field {
  display: inline-flex;
}

.text-area-container {
  flex-grow: 1;
}

textarea {
  display: inline-block;
  width: 100%;
}

input {
  flex-grow: 1;
}
</style>