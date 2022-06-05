<template>
  <div class="d-flex flex-column justify-center">
    <v-row align="center" class="ma-0 pa-5 justify-space-around">
      <v-col class="d-flex justify-center" cols="12" sm="6" md="4">
        <v-img
          contain
          lazy-src="https://picsum.photos/id/11/10/6"
          max-height="400"
          src="https://picsum.photos/id/11/500/300"
          style="clip-path: circle(25% at 50% 50%)"
        ></v-img>
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
            <p>{{ $props.profil.address }}</p>
          </div>
        </v-row>
      </v-col>
      <v-col class="d-flex flex-column" cols="9" sm="5" md="4" lg="3" xl="2">
        <v-btn class="ma-2" color="#417D7A">Modifier son profil </v-btn>
        <v-btn class="ma-2" color="#EF5350">Modifier son mot passe </v-btn>
        <v-btn class="ma-2" color="#66BB6A">Modifier son solde </v-btn>
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
}
</script>