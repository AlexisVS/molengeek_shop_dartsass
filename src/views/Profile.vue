<template>
  <div class="flex flex-col items-center justify-center mt-16 mb-16 px-16" v-if="profile != null">
    <div class="w-full flex items-center mb-16">
      <div class="text-white text-2xl w-1/2 px-5%">
        <div class="font-bold">First name: <span class="font-medium">{{profile.firstname}}</span></div>
        <div class="font-bold">Last name: <span class="font-medium">{{profile.lastname}}</span></div>
      </div>
      <img v-if="imagePreview == null" :src="'https://api-moshop.molengeek.pro' + profile.picture_path" class="w-90%" alt="">
      <img v-else :src="imagePreview" class="w-90%" alt="">
    </div>
    <div class="grid bg-white rounded-lg shadow-xl w-11/12 md:w-9/12 lg:w-1/2">
      <div class="flex justify-center py-4">
        <div class="flex bg-purple-200 rounded-full md:p-4 p-2 border-2 border-purple-300">
          <svg
            class="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </div>
      </div>

      <div class="flex justify-center">
        <div class="flex">
          <h1 class="text-gray-600 font-bold md:text-2xl text-xl">Update profile</h1>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
        <div class="grid grid-cols-1">
          <label
            class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
          >firstname</label>
          <input
            class="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            type="text"
            v-model="firstname"
          />
        </div>
        <div class="grid grid-cols-1">
          <label
            class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
          >lastname</label>
          <input
            class="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            type="text"
            v-model="lastname"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 mt-5 mx-7">
        <label
          class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1"
        >Upload Photo</label>
        <div class="flex items-center justify-center w-full">
          <label
            class="flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-purple-300 group"
          >
            <div class="flex flex-col items-center justify-center pt-7">
              <svg
                class="w-10 h-10 text-purple-400 group-hover:text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p
                class="lowercase text-sm text-gray-400 group-hover:text-purple-600 pt-1 tracking-wider"
              >Select a photo</p>
            </div>
            <input type="file" class="hidden" @change="handleInputFile" />
          </label>
        </div>
      </div>

      <div class="flex items-center justify-center md:gap-8 gap-4 pt-5 pb-5">
        <button
          class="w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
        >Cancel</button>
        <button
          class="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
          @click="submit"
        >Create</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
export default {
  data () {
    return {
      firstname: null,
      lastname: null,
      picture: null,
      imagePreview: null,
    }
  },
  computed: {
    ...mapState([
      'profile',
    ]),
  },
  methods: {
    handleInputFile (e) {
      this.picture = e.target.files[0]
    },
    submit () {
      if (this.firstname != null && this.lastname != null) {
        axios.put('https://api-moshop.molengeek.pro/api/v1/user',
          {
            firstname: this.firstname,
            lastname: this.lastname,
          },
          {
            headers: {
              'Authorization': 'Bearer ' + this.$store.state.authToken,
            }
          })
          this.$store.commit('handleProfile', {
            ...this.profile,
            firstname: this.firstname,
            lastname: this.lastname
          })
      }
      if (this.picture != null) {
        let formData = new FormData();
        formData.append("picture", this.picture)
        axios.put('https://api-moshop.molengeek.pro/api/v1/user/picture',
          formData,
          {
            headers: {
              'Authorization': 'Bearer ' + this.$store.state.authToken,
            }
          },
        )
        this.imagePreview = URL.createObjectURL(this.picture)
      }
    }
  }
}
</script>

<style>
</style>