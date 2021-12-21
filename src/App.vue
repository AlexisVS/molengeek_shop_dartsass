<template>
  <div id="app">
    <TheMenu />
    <div class="container-sm bg-gray-800">
      <router-view :key="$route.fullpath" />
    </div>
  </div>
</template>

<script>
import TheMenu from './components/layout/TheMenu.vue'
export default {
  components: {
    TheMenu,
  },
  mounted () {
    // If authToken has created after 1hour delete authToken else setToken to vueX statement
    if (JSON.parse(localStorage.getItem('authToken')) != null) {
      if (Date.now() - JSON.parse(localStorage.getItem('authToken')).timestamp >= 3600000) { localStorage.removeItem('authToken') }
      else { this.$store.commit('handleAuthToken', JSON.parse(localStorage.getItem('authToken')).token) }
    }
  }
}

</script>

<style scoped lang="sass">

#app
  min-height: 100vh
  display: grid
  grid-template-rows: auto 1fr
</style>
