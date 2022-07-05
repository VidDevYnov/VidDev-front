<template>
  <v-row align="center" class="ma-0 pa-5 justify-space-around">
    <v-col class="d-flex justify-center" cols="12" sm="6" md="4">
      <v-avatar color="primary" size="200">
        <v-img
          :src="
            `${path}/images/users/${$props.member.imageFilePath}` ||
            '../image/avatar.png'
          "
        ></v-img>
      </v-avatar>
    </v-col>
    <v-col cols="12" sm="6" md="4">
      <v-row class="justify-start">
        <div class="d-flex pa-2">
          <p class="pr-1">Prénom :</p>
          <p class="pr-10">{{ $props.member.firstName }}</p>
        </div>
        <div class="d-flex pa-2">
          <p class="pr-1">Nom :</p>
          <p class="pr-10">{{ $props.member.lastName }}</p>
        </div>
        <div class="d-flex pa-2">
          <p class="pr-1">Email :</p>
          <p class="pr-10">{{ $props.member.email }}</p>
        </div>
      </v-row>
      <v-row class="justify-start">
        <div class="d-flex pa-2">
          <p class="pr-1">Bio :</p>
          <p>{{ $props.member.bio || 'Pas de bio' }}</p>
        </div>
      </v-row>
      <v-row class="justify-start">
        <div class="d-flex pa-2">
          <p class="pr-1">Adresse :</p>
          <p>
            {{ $props.member.address }}
          </p>
        </div>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    member: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  computed: {
    path() {
      return process.env.path
    },
  },
}
</script>