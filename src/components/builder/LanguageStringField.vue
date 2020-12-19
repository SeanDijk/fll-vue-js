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
export default {
  name: "LanguageStringField",
  props: {
    value: Object,
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
      selectedLanguage: lang[0].code
    }
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