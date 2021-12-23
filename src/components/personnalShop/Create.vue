<template>
  <div
    class="h-full w-full absolute top-0 left-0 bg-white bg-opacity-20 flex justify-center items-center"
    @click="$emit('showCreateItemModal', false)"
  >
    <div
      class="max-w-6xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 z-20"
      @click.stop
    >
      <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white mb-6">Add shop item</h2>
      <div class="flex flex-col space-y-4">
        <input type="text" placeholder="Name of item" class="rounded-lg"  v-model="name"/>
        <textarea name placeholder="Description of item" class="rounded-lg" id v-model="description" cols="30" rows="10"></textarea>
        <input type="number" placeholder="Price of item" class="rounded-lg" v-model="price" pattern="[0-9]" />
        <input type="file" @change="handleInputFile" />
        <input type="submit" value="Save" class="cursor-pointer px-6 py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600" @click="submit" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data () {
    return {
      name: null,
      description: null,
      price: null,
      cover: null,
    }
  },
  methods: {
    handleInputFile (e) {
      this.cover = e.target.files[0];
    },
    submit () {
      let dataForm = new FormData();
      dataForm.append("name", this.name);
      dataForm.append("description", this.description);
      dataForm.append("price", this.price);
      dataForm.append("cover", this.cover);
      console.log(dataForm);
      axios.post('https://api-moshop.molengeek.pro/api/v1/product', dataForm, {
        headers: {
          Authorization: "Bearer " + this.$store.state.authToken
        }
      }).then(res => {
        if (res.status == 200) {
          this.$emit('closeCreateMyShop', false);
        }
      })
      this.$emit('addedItem', {
        name: this.name,
        description: this.description,
        price: this.price,
        picture: URL.createObjectURL(this.cover)
      })
    },
  }
}
</script>

<style>
</style>