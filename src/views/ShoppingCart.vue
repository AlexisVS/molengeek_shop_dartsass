<template>
  <div>
    <div class="w-full px-14 mt-14 flex items-center">
      <button
        class="bg-blue-500 text-white shadow-sm py-1 px-6 font-bold rounded-md uppercase hover:bg-blue-600"
        @click="buy"
      >Buy</button>
    </div>
    <div class="grid grid-cols-4 gap-9 mt-14 px-14" v-if="shoppingCart != null">
      <!-- Item -->
      <div
        class="flex flex-col items-stretch justify-center transform hover:-translate-y-5 transition-transform duration-1000"
        v-for="item in shoppingCart"
        :key="item.id"
      >
        <img
          :src="'https://api-moshop.molengeek.pro' + item.product.cover_path"
          alt
          class="w-full rounded-t-lg h-36 object-cover"
        />
        <div class="px-4 py-6 bg-gray-900 rounded-b-lg">
          <span class="text-center text-white font-bold text-xl mb-4">{{ item.name }}</span>
          <p
            class="text-gray-200 text-justify text-sm h-20 overflow-hidden"
          >Quantity: {{ item.quantity }}</p>
          <p
            class="text-gray-200 text-justify text-sm h-20 overflow-hidden"
          >Price for one: {{ item.product.price }}</p>
          <p
            class="text-6xl text-white text-center uppercase font-black flex justify-center items-center"
          >
            €
            <span class="text-4xl uppercase ml-2">{{ item.product.price * item.quantity }}</span>
          </p>
        </div>
      </div>
    </div>
    <p v-if="payd != null" class="text-6x text-white font-semibold">Vous avez payer {{ payd.price }}€</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
export default {
  data () {
    return {
      shoppingCart: null,
      payd: null,
    }
  },
  computed: {
    ...mapState([
      // 'shoppingCart',
    ])
  },
  methods: {
    buy () {
      axios.post('https://api-moshop.molengeek.pro/api/v1/buy', 'sdfkhs', {
        headers: {
          Authorization: "Bearer " + this.$store.state.authToken
        }
      }).then(res => this.payd = res.data.data)
    },
  },
  mounted () {
    axios.get("https://api-moshop.molengeek.pro/api/v1/cart", {
      headers: {
        Authorization: "Bearer " + this.$store.state.authToken
      }
    })
      .then(res => {
        console.log(res);
        return this.shoppingCart = res.data.data
      })
  }
}
</script>

<style>
</style>