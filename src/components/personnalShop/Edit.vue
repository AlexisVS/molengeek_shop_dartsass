<template>
  <div
    class="h-full w-full absolute top-0 left-0 bg-white bg-opacity-20 flex justify-center items-center"
    @click="$emit('closeEditModal', false)"
  >
    <div
      class="max-w-6xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 z-20"
      @click.stop
    >
      <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white mb-6">Add shop item</h2>
      <div class="flex flex-col space-y-4">
        <input type="text" placeholder="Name of item" class="rounded-lg" v-model="name" />
        <textarea
          name
          placeholder="Description of item"
          class="rounded-lg"
          id
          v-model="description"
          cols="30"
          rows="10"
        ></textarea>
        <input
          type="number"
          placeholder="Price of item"
          class="rounded-lg"
          v-model="price"
          pattern="[0-9]"
        />
        <input type="file" 
        @change="handleInputFile"/>
        <input
          type="submit"
          value="Save"
          class="cursor-pointer px-6 py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600"
          @click="submit"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  props: {
    itemId: { type: Number }
  },
  data () {
    return {
      name: null,
      description: null,
      price: null,
      picture: null,
    }
  },
  methods: {
    handleInputFile (e) {
      this.picture = e.target.files[0]
    },
    submit () {
      if (this.name != null && this.description != null && this.price != null) {

        let dataForm = new FormData();
        dataForm.append("name", this.name);
        dataForm.append("description", this.description);
        dataForm.append("price", parseInt(this.price));
        axios.put('https://api-moshop.molengeek.pro/api/v1/product/' + this.itemId, dataForm, {
          headers: {
            Authorization: "Bearer " + this.$store.state.authToken
          }
        }).then(res => {
          if (res.status == 200) {
            this.$emit('closeEditModal', false);
            this.$emit('editItem', {
              id: this.itemId,
              name: this.name,
              description: this.description,
              price: this.price,
            })
          }
        })
      }
      if (this.picture != null) {
        let dataFormImage = new FormData();
        dataFormImage.append('cover', this.picture);
        axios.put('https://api-moshop.molengeek.pro/api/v1/product/' + this.itemId + '/picture', dataFormImage, {
          headers: {
            Authorization: "Bearer " + this.$store.state.authToken
          }
        }).then(res => {
          if (res.status == 200) {
            this.$emit('closeEditModal', false);
            this.$emit('editItemImage', {
              id: this.itemId,
              cover_path: URL.createObjectURL(this.picture)
            })
          }
        })
      }
    },
  }
}
</script>

<style>
</style>