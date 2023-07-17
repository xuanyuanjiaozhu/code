<template>
    <p>自定义Hook</p>
    <button @click="isShowDemo = !isShowDemo">切换隐藏/显示</button>
    <Demo v-if="isShowDemo"></Demo>
    <hr>
    <Test></Test>
</template>

<script>
    import {ref} from 'vue';
    import Demo from "../components/Hook/Demo";
    import Test from "../components/Hook/Test";

    export default {
        name: "Hook",
        components: {Demo, Test},
        setup() {
            let isShowDemo = ref(true);

            return {
                isShowDemo
            }
        }


    }
</script>

<style scoped>

</style>