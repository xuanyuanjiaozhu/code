<template>
    <div>Home</div>
    <button @click="onNews">News</button>
</template>

<script>
    import {useRouter} from "vue-router"
    export default {
        name: "Home",
        setup(){
            const router = useRouter();

            function onNews() {
                router.push({name:"News"})
            }
            return{
                onNews
            }
        }

    }
</script>

<style scoped>

</style>