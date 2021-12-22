<template>
  <div class="container mx-auto mt-10 grid grid-cols-3 gap-10">
    <!-- Item -->
    <div v-for="item in shops" :key="'shops-' + item.id">
      <router-link :to="'/shop/' + item.id">
        <div class="w-full h-full bg-gray-700 py-2 px-4 rounded-lg">
          <p class="text-sm text-white bre">{{ item.name }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      shops: null,
    }
  },
  mounted () {
    axios.get('https://api-moshop.molengeek.pro/api/v1/shops', {
      headers: {
        'Authorization': 'Bearer ' + this.$store.state.authToken
      }
    }).then(res => this.shops = res.data.data)
  }
}
</script>

<style>
</style>