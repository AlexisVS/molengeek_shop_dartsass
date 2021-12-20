<template>
  <div id="app">
    <TheMenu />
    <div class="container-sm bg-gray-800">
      <router-view  :key="$route.fullpath"/>
    </div>
  </div>
</template>

<script>
import TheMenu from './components/layout/TheMenu.vue'
export default {
  components: {
    TheMenu,
  }
}

</script>

<style scoped lang="sass">
#app
  min-height: 100vh
  display: grid
  grid-template-rows: auto 1fr
</style>
