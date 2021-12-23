<template>
  <div class="px-16">
    <div class="w-full flex items-center mt-12 justify-between">
      <!-- <h1 v-if="myShop != null" class="text-gray-300 text-5xl font-semibold">{{ myShop.name }}</h1> -->
      <button
        class="bg-blue-500 text-white shadow-sm py-1 px-6 font-bold rounded-md uppercase hover:bg-blue-600"
        @click="displayModalCreate = !displayModalCreate"
      >Add items</button>
    </div>
    <Create
      v-show="displayModalCreate"
      @closeCreateMyShop="displayModalCreate = !displayModalCreate"
      @showCreateItemModal="displayModalCreate = !displayModalCreate"
      @addedItem="addItemToMyShop"
    />
    <div class="grid grid-cols-4 gap-9 mt-14 px-14" v-if="myShop != null">
      <!-- Item -->
      <div
        class="flex flex-col items-stretch justify-center transform hover:-translate-y-5 transition-transform duration-1000"
        v-for="item in myShop"
        :key="item.id"
      >
        <img
          v-if="item.picture != null"
          :src="item.picture"
          alt
          class="w-full rounded-t-lg h-36 object-cover"
        />
        <img
          v-else
          :src="'https://api-moshop.molengeek.pro' + item.cover_path"
          alt
          class="w-full rounded-t-lg h-36 object-cover"
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
          <button
            class="w-full text-white py-2 text-center my-4 rounded-lg bg-blue-500 hover:bg-blue-600 font-bold uppercase"
            @click="addToCart(item.id)"
          >Add to card</button>
          <div class="text-xs flex space-x-4 text-white items-center justify-center mt-2">
            <button
              class="bg-green-600 rounded-sm py-2 px-5 hover:bg-green-700 uppercase"
              @click="displayedModalEdit(item.id)"
            >Edit</button>
            <button
              @click="deleteProduct(item.id)"
              class="bg-red-600 rounded-sm py-2 px-5 hover:bg-red-700 uppercase"
            >Delete</button>
          </div>
        </div>
      </div>
    </div>
    <Edit
      v-show="displayModalEdit"
      @closeEditModal="displayModalEdit = !displayModalEdit"
      :itemId="modalId"
      @editItem="editedItemToMyShop"
    />
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import Create from '../components/personnalShop/Create.vue'
import Edit from '../components/personnalShop/Edit.vue';
export default {
  data () {
    return {
      displayModalCreate: false,
      displayModalEdit: false,
      modalId: null,
      myShop: null,
    };
  },
  computed: {
    ...mapState([
      // "myShop",
      // 'shoppingCart',
    ]),
  },
  methods: {
    displayedModalEdit (itemId) {
      this.modalId = itemId;
      this.displayModalEdit = true
    },
    deleteProduct (itemId) {
      axios.delete('https://api-moshop.molengeek.pro/api/v1/product/' + itemId, {
        headers: {
          Authorization: "Bearer " + this.$store.state.authToken
        }
      })
      this.myShop = [...this.myShop].filter(e => e.id != itemId)
    },
    addToCart (itemId) {
      // let item 
      // item = this.myShop.products.find(e => e.id == itemId )
      // this.$store.commit('handleShoppingCart', { ...item, quantity: 1 });
      let dataForm = new FormData();
      dataForm.append('product', itemId);
      dataForm.append('quantity', 1);
      axios.post("https://api-moshop.molengeek.pro/api/v1/cart", dataForm, {
        headers: {
          Authorization: "Bearer " + this.$store.state.authToken
        }
      }).then(res => console.log(res));
    },
    addItemToMyShop (object) {
      this.myShop = [...this.myShop, {...object, id: this.myShop.pop().id + 1}];
    },
    editedItemToMyShop (object) {
      this.myShop = [...this.myShop].map(e => {
        if (e.id == object.id) {
          return {...e, ...object}
        }
        return e
      })
    }
  },
  mounted () {
    axios.get("https://api-moshop.molengeek.pro/api/v1/shop", {
      headers: {
        Authorization: "Bearer " + this.$store.state.authToken
      }
    }).then(res => {
      console.log(res.data.data.products);
      this.myShop = res.data.data.products
      // this.$store.commit('handleMyShop', res.data.data);
    });

  },
  components: { Create, Edit }
}
</script>

<style>
</style>