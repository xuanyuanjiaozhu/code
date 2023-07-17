<template>
    <h1>一个人的信息</h1>
    <h2>姓名：{{person.name}}</h2>
    <h2>年龄：{{person.age}}</h2>
    <h3>msg：{{msg}}</h3>
    <h3>school：{{school}}</h3>
    <button @click="test">test,测试一下hello事件</button>
</template>

<script>
    import {reactive} from 'vue'

    export default {
        name: "Setup_1",
        props: ['msg', 'school'],
        emits: ['hello'],
        setup(props,context) {
            const person = reactive({
                name: 'jack',
                age: 18
            });
            function test() {
                context.emit('hello',666)
            }

            return {
                person,
                test
            }
        }
    }
</script>

<style scoped>

</style>