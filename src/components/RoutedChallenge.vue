<template>
    <challenge
    :name="challengeJson.name"
    :missions="challengeJson.missions"
    :description="challengeJson.description"
    :from-assets="true">

    </challenge>
</template>

<script>
    import Challenge from "./Challenge";
    export default {
        name: "RoutedChallenge",
        components: {Challenge},
        data() {
            return {
                challengeJson: require(`../assets/challenges/${this.$route.params.id}/challenge.json`)
            }
        },
        created(){

            console.log()
        }
    }
</script>

<style scoped>

</style>