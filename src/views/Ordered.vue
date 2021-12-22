<template>
  <!-- component -->
  <div class="">
    <div class="container mx-auto">
      <div class="m-8 rounded overflow-hidden">
        <!-- accordion-tab  -->
        <div class="group outline-none accordion-section" v-for="(item, index) in orders" :key="'command-' + index + 1" :tabindex="index + 1">
          <div
            class="group bg-gray-900 flex justify-between px-4 py-3 items-center text-gray-500 transition ease duration-500 cursor-pointer pr-10 relative"
          >
            <div class="group-focus:text-white transition ease duration-500">Command #{{index + 1}}</div>
            <div
              class="h-8 w-8 border border-gray-700 rounded-full items-center inline-flex justify-center transform transition ease duration-500 group-focus:text-white group-focus:-rotate-180 absolute top-0 right-0 mb-auto ml-auto mt-2 mr-2"
            >
              <i class="fas fa-chevron-down"></i>
            </div>
          </div>
          <div
            class="group-focus:max-h-screen max-h-0 bg-gray-800 px-4 overflow-hidden ease duration-500"
          >
            <div class="w-full grid grid-cols-3">
              <p class="text-xs text-white">Commands id: {{item.id}}</p>
              <p class="text-xs text-white">price: {{item.price}}</p>
              <p class="text-xs text-white">Date: {{item.date}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data () {
return {
  orders: null,
}
  },
mounted () {
  axios.get('https://api-moshop.molengeek.pro/api/v1/orders', {
        headers: {
          Authorization: "Bearer " + this.$store.state.authToken
        }
      })
      .then(res => {
        console.log(res);
        this.orders = res.data.data
      })
}
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700;900&display=swap");
body {
  font-family: "Rubik", sans-serif;
}
</style>