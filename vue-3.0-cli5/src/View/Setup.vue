<template>
    <Setup_1 @hello="showHelloMsg" msg="你好"  school="敲代码的猪">

    </Setup_1>
    
</template>

<script>
    import Setup_1 from "../components/Setup/Setup_1";
    export default {
        name: "Setup",
        components:{Setup_1},
        setup(){

            function showHelloMsg(Value) {
                console.log('showHelloMes'+Value)
            }
            return{
                showHelloMsg
            }
        }
    }
</script>

<style scoped>

</style>