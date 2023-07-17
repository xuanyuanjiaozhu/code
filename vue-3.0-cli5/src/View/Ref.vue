<template>
    <div>
        <p>name:   {{name}}</p>
        <p>age:   {{age}} <button @click="age++">+</button><button @click="age--">-</button></p>

        <button @click="setName">姓名</button>
    </div>
</template>

<script>
    import {ref} from 'vue'
    export default {
        name: "ref",
        setup(){
            let name = ref('name');
            let age = ref(18);
            function setName() {
                name.value = name.value + age.value;

                console.log(name,"iiii")
            }
            return{
                name,
                age,
                setName
            }
        }
    }
</script>

<style scoped>

</style>