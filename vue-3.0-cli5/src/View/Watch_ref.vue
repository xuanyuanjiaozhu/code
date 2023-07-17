<template>
    <h3>当前求和为：{{sum}}</h3>
    <button @click="sum++">修改求和信息</button>
    <hr>
    <h3>当前的信息为：{{msg}}</h3>
    <button @click="msg += '!'">修改信息</button>
    <hr>
    <h2>姓名：{{person.name}}</h2>
    <h2>年龄：{{person.age}}</h2>
    <h2>薪资：{{person.job.j1.salary}}K</h2>
    <button @click="person.name+='~'">修改姓名</button>
    <button @click="person.age++">增长年龄</button>
    <button @click="person.job.j1.salary++">涨薪</button>
</template>

<script>
    import {ref, reactive, watch} from 'vue'

    export default {
        name: "Watch",
        setup() {
            let sum = ref(0);
            let msg = ref('你好啊');
            let person = ref({
                name: '张三',
                age: 18,
                job: {
                    j1: {
                        salary: 20
                    }
                }
            });

            //情况一：监视ref所定义的一个响应式数据
            watch(sum, (newValue, oldValue) => {
                console.log('sum变了', newValue, oldValue)
            });

            watch(person, (newValue, oldValue) => {
                console.log('person的值变化了', newValue, oldValue)
            }, {deep: true})

            return {
                sum,
                msg,
                person
            }
        }
    }
</script>

<style scoped>

</style>