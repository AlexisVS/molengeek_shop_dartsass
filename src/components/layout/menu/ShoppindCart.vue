<template>
  <router-link to="/shopping-cart">
    <div class="bg-gray-500 py-1 px-3 rounded-lg text-white flex items-center space-x-5">
      <span>Shopping Cart {{ personnalShopShoppinfCartQuantity }}</span>
    </div>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'personnalShopShoppinfCartQuantity',
    ])
  }
}
</script>

<style>
</style>