<template>
    <header class="flex-row flex-text-center">
        <a class="header-item" href="#">FLL Score app</a>
        <span class="flex-filler"/>
        <a class="header-item" href="#">Presets</a>
        <a class="header-item" href="#">Builder</a>

    </header>
</template>

<script>
    export default {
        name: "Header"
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