<template>
  <div>
    <p>Keep-alive-2</p>
    <button @click="goKeepAlive(1)">keep-alive-3</button>
    <button @click="goKeepAlive(2)">keep-alive-3</button>
  </div>
</template>

<script>
  export default {
    name: "Keep-alive-2",
    data() {
      return {
        Num: 0
      }
    },
    activated() {
      console.log('keep-alive-2   activated')
    },
    deactivated() {
      console.log('keep-alive-2  deactivated')
    },
    beforeRouteLeave(to, form, next) {
      switch (this.Num) {
        case 1:
          this.$store.dispatch('setKeepAliveInclude', ['Keep-alive-1']);
          break;
        case 2:
          this.$store.dispatch('setKeepAliveInclude', []);
          break;

      }
      setTimeout(() => {
        next()
      }, 10)
    },
    methods: {
      goKeepAlive(Num) {
        this.Num = Num;
        this.$router.push({name: "Keep-alive-3"})

      }
    }
  }
</script>

<style scoped>

</style>
