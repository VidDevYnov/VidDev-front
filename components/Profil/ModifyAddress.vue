<template>
  <v-col cols="12" md="4">
    <v-card color="pa-5">
      <p class="ma-2">Mes adresses</p>
      <ProfilListAddresses :profil="$props.profil" />
      <ProfilFormNewAddress />
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    profil: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
}
</script>
