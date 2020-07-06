<template>
    <header class="flex-row flex-text-center">
        <router-link class="header-item" to="/">FLL Score app</router-link>
        <span class="flex-filler"/>
        <router-link  class="header-item" to="#">Presets</router-link >
        <router-link  class="header-item" to="#">Builder</router-link >
        <router-link  class="header-item" to="/test">Test</router-link >

    </header>
</template>

<script>
    export default {
        name: "AppHeader"
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