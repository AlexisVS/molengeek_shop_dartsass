<template>
  <div class="grid grid-cols-4 gap-9 mt-14 px-14">
    <!-- Item -->
    <div
      class="flex flex-col items-stretch justify-center transform hover:-translate-y-5 transition-transform duration-1000"
      v-for="item in shop"
      :key="item.id"
    >
      <img
        :src="'https://api-moshop.molengeek.pro' + item.cover_path"
        alt
        class="w-full rounded-t-lg"
      />
      <div class="px-4 py-6 bg-gray-900 rounded-b-lg">
        <span class="text-center text-white font-bold text-xl mb-4">{{ item.name }}</span>
        <p
          class="text-gray-200 text-justify text-sm h-20 overflow-hidden"
        >{{ item.description.slice(0, 200) }}</p>
        <p
          class="text-6xl text-white text-center uppercase font-black flex justify-center items-center"
        >
          €
          <span class="text-4xl uppercase ml-2">{{ item.price }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data () {
    return {
      shop: null,
    }
  },
  mounted () {
    axios.get('https://api-moshop.molengeek.pro/api/v1/mg/shop')
      .then(res => this.shop = res.data.data.products)
  }
}
</script>

<style>
</style>