<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {

  }
}
</script>

<style scoped>
  #app::-webkit-scrollbar{
    display: none;
  }
#app{
  /*background-color: #010a4b;*/
  height: 100%;
  overflow-y: scroll;
}
</style>
