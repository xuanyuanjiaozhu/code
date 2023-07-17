<template>
    <div>
      <p>Keep-alive-3</p>
    </div>
</template>

<script>
    export default {
        name: "Keep-alive-3",
      activated() {
        console.log('keep-alive-3   activated')
      },
      deactivated() {
        console.log('keep-alive-3  deactivated')
      }
    }
</script>

<style scoped>

</style>
