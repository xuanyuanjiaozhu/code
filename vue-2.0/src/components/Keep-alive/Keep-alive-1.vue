<template>
  <div>
    <p>Keep-alive-1</p>
  </div>
</template>

<script>
  export default {
    name: "Keep-alive-1",
    activated() {
      console.log('keep-alive-1   activated')
    },
    deactivated() {
      console.log('keep-alive-1  deactivated')
    }
  }
</script>

<style scoped>

</style>
