<template>
  <div>
    <router-link to="/profile">
      <div v-if="profile != null" class="flex cursor-pointer">
        <img
          :src="'https://api-moshop.molengeek.pro' + profile.picture_path"
          class="h-10 rounded-l-full"
          alt
        />
        <div class="bg-gray-600 h-10 items-center flex space-x-4 text-xs rounded-r-full text-white">
          <span>{{ profile.firstname + ' ' + profile.lastname }}</span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import axios from "axios"
import { mapState } from "vuex";
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState([
      'profile',
    ])
  },
  mounted () {
    console.log(this.$store.state.authToken);
    axios.get('https://api-moshop.molengeek.pro/api/v1/user', {
      headers: {
        'Authorization': 'Bearer ' + this.$store.state.authToken
      }
    })
      .then(res => {
        console.log(res);
        this.$store.commit('handleProfile', res.data.data.profile)
      })
  }
}
</script>

<style>
</style>