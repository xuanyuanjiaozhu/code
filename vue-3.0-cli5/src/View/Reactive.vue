<template>
    <div>
        <p>姓名：{{person.name}}</p>
        <p>年龄：{{person.age}} <button @click="person.age++">+</button> <button @click="person.age--">-</button></p>
        <p>姓名：{{dog.name}}</p>
        <p>年龄：{{dog.age}} <button @click="dog.age++">+</button> <button @click="dog.age--">-</button></p>
        <p>code：{{dog.address.code}} <button @click="dog.address.code++">+</button> <button @click="dog.address.code--">-</button></p>
        <button @click="print">打印</button>
    </div>
</template>

<script>
    import {ref,reactive} from 'vue'
    export default {
        name: "Reactive",
        setup(){
            const person = reactive({
                name:"小明",
                age:18
            });
            const dog = ref({
                name:'小黄',
                age:1,
                address:{
                    code:12
                }
            });
            function print() {
                console.log(dog,person)
            }


            return{
                person,
                dog,
                print

            }
        }
    }
</script>

<style scoped>

</style>