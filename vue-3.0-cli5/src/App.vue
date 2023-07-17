<template>
    <div>
        <div class="nav">
            <p v-for="item in routes" :key="item.name" @click="jump(item.name)">{{item.name}}</p>
        </div>

        <router-view></router-view>
    </div>
</template>

<script>
    import routes from "./Utils/routes";
    import {useRouter} from "vue-router"

    export default {
        name: 'App',
        setup() {
            const router = useRouter();

            function jump(name) {
                router.push({name})
            }

            return {
                routes,
                jump
            }
        }
    }
</script>
<style scoped lang="scss">
    .nav{
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 10px;
        border-bottom: 2px solid #00d2d3;
        margin-bottom: 10px;
        p{
            margin: 0 6px;
            border: #00ccff 1px solid;
            border-radius: 4px;
            padding: 4px 6px ;
        }
    }

</style>

