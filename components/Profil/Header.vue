<template>
  <div>
    <v-row class="ma-0 px-10 pb-2 align-center justify-end">
      <p class="pr-2 ma-0">{{ $store.state.user.profil.solde || 0 }}</p>
      <v-icon style="font-size: 30px">mdi-cash-multiple</v-icon>
    </v-row>
    <v-row class="ma-0 px-10 align-center justify-end">
      <p class="pr-2 ma-0">{{ $store.state.user.profil.point || 0 }}</p>
      <v-icon style="font-size: 30px">mdi-heart-multiple</v-icon>
    </v-row>
  </div>
</template>