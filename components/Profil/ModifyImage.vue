<template>
  <v-col cols="12" md="3">
    <v-card color="pa-5">
      <div class="d-flex justify-space-around">
        <v-img
          max-height="200"
          max-width="200"
          :src="
            `http://localhost:8000/images/users/${$props.profil.imageFilePath}` ||
            '../image/avatar.png'
          "
        ></v-img>
      </div>

      <v-file-input
        v-model="avatar"
        label="Choisir une image"
        hide-details
        class="d-flex align-center my-4"
        accept="image/png, image/jpeg, image/bmp"
        prepend-icon="mdi-camera"
        outlined
        dense
      ></v-file-input>

      <v-row class="justify-center">
        <v-btn class="ma-2" outlined @click="uploadFile()">Mettre à jour</v-btn>
      </v-row>
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

  data() {
    return {
      avatar: [],
    }
  },

  methods: {
    async getProfil() {
      await this.$store.dispatch('user/setProfil')
    },
    async uploadFile() {
      const formData = new FormData()
      formData.append('file', this.avatar)
      await this.$store.dispatch('user/addProfilImage', {
        idUser: this.$props.profil.id,
        formData,
      })
      this.getProfil()
    },
  },
}
</script>

