<template>
    <header class="flex-row flex-text-center">
        <router-link class="header-item" to="/">FLL Score app</router-link>
        <span class="flex-filler"/>
        <router-link  class="header-item" to="#">Presets</router-link >
        <router-link  class="header-item" to="/builder">Builder</router-link >
        <router-link  class="header-item" to="/challenges/2019-2020">Test</router-link >
        <language-picker/>
    </header>
</template>

<script>
    import LanguagePicker from "./LanguagePicker";
    export default {
        name: "AppHeader",
        components: {LanguagePicker}
    }
</script>

<style scoped>
    header {
        background-color: #42b983;
        color: white;
        height: 64px;
        padding: 8px;
        box-sizing: border-box;
    }
    .header-item {
        color: inherit;
        text-decoration: none;
        padding: 16px;
    }
</style>