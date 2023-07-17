<template>
    <div>
        <p>News</p>
        <button @click="onHome">Home</button>
        <hr/>
        <News_1 :age="18" name="news-1"></News_1>
    </div>
</template>

<script>
    import News_1 from "../components/News/News-1"
    import {useRouter} from "vue-router"
    export default {
        name: "New",
        components:{News_1},
        setup(props,context){
            const router = useRouter();
            function onHome(){
                console.log(router.push({name:"Home"}),'onHome')
            }

            return {
                onHome
            }

        }
    }
</script>

<style scoped>

</style>