<template>
    <div id="app">
        <app-header/>
        <router-view></router-view>

        <app-footer/>

    </div>
</template>

<script>
    import AppHeader from "./components/Header";
    import AppFooter from "./components/Footer";

    // class Mission {
    //     constructor(id, name, description, missionParts) {
    //         this.id = id;
    //         this.name = name;
    //         this.description = description;
    //         this.missionParts = missionParts;
    //     }
    // }


    export default {
        name: 'app',
        components: {
            AppHeader,
            AppFooter
        }
    }
</script>

<style>
    #app {
        /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /*text-align: center;*/
        /*color: #2c3e50;*/
    }
</style>
