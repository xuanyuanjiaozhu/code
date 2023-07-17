<template>
    <button @click="isShowDemo= !isShowDemo" >切换隐藏/显示</button>
    <Demo v-if="isShowDemo"></Demo>
</template>

<script>
    import Demo from "../components/toRef_toRefs/Demo";
    import {ref} from 'vue'
    export default {
        name: "toRef_toRefs",
        components:{Demo},
        setup(){
            let isShowDemo = ref(true);

            return{
                isShowDemo
            }
        }
    }
</script>

<style scoped>

</style>