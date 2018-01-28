<template>
  <div class="user-menu__wrapper">
    <button class="avatar-btn" v-if="loggedUser" @click="logOut">
      <img :src="loggedUser.avatar_url" alt="User avatar" height="100%" width="100%"/>
    </button>

    <button class="avatar-btn" v-if="!loggedUser" @click="logIn">
      <svgicon icon="system/gh_logo" width="100%" height="100%" :original="true"></svgicon>
    </button>
  </div>
</template>


<script>
import { mapState, mapActions } from 'vuex'
import { logIn, logOut, checkAuth } from '@/store/types'

import '@/assets/icons/system/gh_logo'

export default {
  name: 'user-menu',
  computed: mapState({
    isLoggedIn: state => state.oauth.isAuthorized,
    loggedUser: state => state.oauth.authenticatedUser
  }),
  created: function () {
    this.checkAuth()
  },
  methods: {
    ...mapActions([logIn, logOut, checkAuth])
  }
}
</script>


<style scoped>
.user-menu__wrapper {
  display: flex;
}

.avatar-btn {
  cursor: pointer;
  height: 32px;
  width: 32px;
  margin-left: 22px;
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;
}
.avatar-btn * {
  border-radius: 50%;
}
</style>
