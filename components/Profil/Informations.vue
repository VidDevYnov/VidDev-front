<template>
  <div class="d-flex flex-column justify-center">
    <v-row align="center" class="ma-0 pa-5 justify-space-around">
      <v-col class="d-flex justify-center" cols="12" sm="6" md="4">
        <v-avatar color="primary" size="200">
          <v-img
            :src="
              `${path}/images/users/${$props.profil.imageFilePath}` ||
              '../image/avatar.png'
            "
          ></v-img>
        </v-avatar>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-row class="justify-start">
          <div class="d-flex pa-2">
            <p class="pr-1">Prénom :</p>
            <p class="pr-10">{{ $props.profil.firstName }}</p>
          </div>
          <div class="d-flex pa-2">
            <p class="pr-1">Nom :</p>
            <p class="pr-10">{{ $props.profil.lastName }}</p>
          </div>
          <div class="d-flex pa-2">
            <p class="pr-1">Email :</p>
            <p class="pr-10">{{ $props.profil.email }}</p>
          </div>
        </v-row>
        <v-row class="justify-start">
          <div class="d-flex pa-2">
            <p class="pr-1">Bio :</p>
            <p>{{ $props.profil.bio || 'Pas de bio' }}</p>
          </div>
        </v-row>
        <v-row class="justify-start">
          <div class="d-flex pa-2">
            <p class="pr-1">Adresse :</p>
            <p>
              {{ $props.profil.address }}
            </p>
          </div>
        </v-row>
      </v-col>
      <v-col cols="9" sm="5" md="4" lg="3" xl="2">
        <NuxtLink to="modify" class="text-decoration-none">
          <v-btn class="ma-2" outlined>
            <v-icon class="mr-2">mdi-pencil</v-icon> Modifier son profil</v-btn
          >
        </NuxtLink>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    profil: {
      type: Object,
      required: true,
    },
  },
  computed: {
    path() {
      return process.env.NUXT_ENV_PATH
    },
  },
}
</script>