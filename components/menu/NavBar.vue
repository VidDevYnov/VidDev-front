<template>
  <div>
    <v-app-bar color="light" light style="box-shadow: none">
      <v-col cols="4" sm="3" md="2" lg="1" class="d-flex space-around">
        <NuxtLink to="/">
          <v-img width="100" src="/image/logo.png"></v-img>
        </NuxtLink>
      </v-col>
      <v-col cols="8" sm="9" md="10" lg="11" class="d-flex justify-end pa-0">
        <div class="d-flex flex-column justify-center ma-2">
          <v-icon>mdi-message</v-icon>
        </div>
        <div class="d-flex flex-column justify-center ma-2">
          <v-icon>mdi-bell</v-icon>
        </div>
        <div class="d-flex flex-column justify-center ma-2">
          <v-icon>mdi-basket</v-icon>
        </div>
        <div class="d-flex flex-column justify-center">
          <v-app-bar-nav-icon
            @click="isActive = !isActive"
          ></v-app-bar-nav-icon>
        </div>
      </v-col>
    </v-app-bar>
    <div
      style="display: none; background: #f1f1f1"
      :class="{ showNavBar: isActive }"
    >
      <v-col
        cols="12"
        sm="5"
        md="3"
        lg="2"
        class="d-flex flex-column justify-center"
      >
        <NuxtLink class="text-center ma-2" to="/" style="color: black"
          >Tous les articles</NuxtLink
        >

        <NuxtLink
          class="text-center ma-2"
          style="color: black"
          v-for="button in listButton"
          :key="button.name"
          :to="button.path"
        >
          {{ button.name }}
        </NuxtLink>
      </v-col>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      isActive: false,
    }
  },
  computed: {
    listButton() {
      if (localStorage.getItem('token')) {
        return [
          {
            name: 'Profil',
            path: '/user/profil',
          },
          {
            name: 'Paramètre du compte',
            path: '/user/account',
          },
          {
            name: 'Déconnexion',
            path: '/auth/logout',
          },
        ]
      }
      return [
        {
          name: 'Connection',
          path: '/auth/login',
        },
        {
          name: 'Inscritpion',
          path: '/auth/register',
        },
      ]
    },
  },
}
</script>

<style>
.showNavBar {
  display: flex !important;
  flex-direction: row;
  justify-content: center;
}
</style>

