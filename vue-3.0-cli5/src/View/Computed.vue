<template>
    <h2>一个人的信息</h2>
    <h3>姓：{{person.firstName}}</h3>
    <h3>名：{{person.lastName}}</h3>
    <h3>全名：{{person.fullName}}</h3>
    <hr>
    <h3>修改姓名：<input type="text"  v-model="person.fullName"></h3>

</template>

<script>
    import {reactive, computed} from 'vue'

    export default {
        name: "Computed",
        setup() {

            const person = reactive({
                firstName: "张",
                lastName: '三'
            });
            person.fullName = computed({
                get() {
                    return person.firstName + "-" + person.lastName;
                },
                set(value) {
                    const nameArr = value.split("-");
                    person.firstName = nameArr[0];
                    person.lastName = nameArr[1];
                }
            })

            return {
                person
            }

        }
    }
</script>

<style scoped>

</style>