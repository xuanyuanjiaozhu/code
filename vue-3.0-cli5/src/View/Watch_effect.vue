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
    import {ref, reactive, watchEffect} from 'vue'

    export default {
        name: "Watch",
        setup() {
            let sum = ref(0);
            let msg = ref('你好啊');
            let person = reactive({
                name: '张三',
                age: 18,
                job: {
                    j1: {
                        salary: 20
                    }
                }
            });

            watchEffect(()=>{
                const x1 = sum.value;
                const x2 = person.job.j1.salary;
                console.log('watchEffect所指定的回调执行了')
            })

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