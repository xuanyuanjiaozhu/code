<template>
    <div>News-1</div>
</template>

<script>
    export default {
        name: "News-1",
        props:['age','name'],
        setup(props,context){
            console.log(props.age,props.name,context.attrs.name,context.attrs.age,"News-1")

        }
    }
</script>

<style scoped>

</style>