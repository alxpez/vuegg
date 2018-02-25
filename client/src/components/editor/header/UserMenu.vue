<template>
  <div class="user-menu__wrapper">
    <mdc-menu-anchor v-if="loggedUser">
      <button class="avatar-btn" @click="showUserMenu">
        <img :src="loggedUser.avatar_url" alt="User avatar" height="100%" width="100%" draggable="false"/>
      </button>
      <mdc-menu ref="userMenu" @select="onSelect">
        <mdc-menu-item disabled>
          <div class="menu-title">
            <span class="name">{{loggedUser.name || loggedUser.login}}</span>
            <span class="login">@{{loggedUser.login}}</span>
            <img class="avatar" :src="loggedUser.avatar_url" alt="User avatar"/>
          </div>
        </mdc-menu-item>
        <mdc-menu-divider></mdc-menu-divider>
        <mdc-menu-item>Logout</mdc-menu-item>
      </mdc-menu>
    </mdc-menu-anchor>

    <button class="avatar-btn" v-if="!loggedUser" @click="logIn" :disabled="!loginBtnEnabled" v-tooltip="'Login with GitHub'" >
      <svgicon icon="system/gh_logo" width="100%" height="100%"
        :color="loginBtnEnabled ? '#2b6a73': 'rgba(0,0,0,.38)'">
      </svgicon>
    </button>
  </div>
</template>


<script>
import { mapState, mapActions } from 'vuex'
import { logIn, logOut } from '@/store/types'

import '@/assets/icons/system/gh_logo'

export default {
  name: 'user-menu',
  data: function () {
    return {
      loginBtnEnabled: true
    }
  },
  computed: mapState({
    isLoggedIn: state => state.oauth.isAuthorized,
    loggedUser: state => state.oauth.authenticatedUser
  }),
  methods: {
    showUserMenu () {
      this.$refs.userMenu.show()
    },

    onSelect (selected) {
      const LOGOUT = 1

      switch (selected.index) {
        case LOGOUT: this.logOut(); break
      }
    },

    ...mapActions([logIn, logOut])
  }
}
</script>


<style scoped>
.user-menu__wrapper {
  display: flex;
  user-select: none;
}

.mdc-menu-anchor {
  display: flex;
}
.mdc-menu {
  background-color: #fff;
  transform-origin: right top 0 !important;
  top: 0px !important;
  right: 0px;
  left: auto !important;
}

.menu-title {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 18px;
  grid-template-areas:
    'name avatar'
    'login avatar';
}
.name {
  grid-area: name;
  color: rgba(0, 0, 0, 0.57);
  font-size: 14px;
}
.login {
  grid-area: login;
  color: rgba(0, 0, 0, 0.38);
  font-size: 11px;
}
.avatar {
  grid-area: avatar;
  border-radius: 50%;
  margin-left: auto;
  height: 40px;
  width: 40px;
}

.avatar-btn {
  cursor: pointer;
  height: 32px;
  width: 32px;
  margin-left: 10px;
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;
}
.avatar-btn * {
  border-radius: 50%;
}
</style>
