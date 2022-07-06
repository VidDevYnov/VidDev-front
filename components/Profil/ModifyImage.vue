<template>
  <v-col cols="12" md="3">
    <v-card color="pa-5">
      <div class="d-flex justify-space-around">
        <v-avatar color="primary" size="200">
          <v-img
            :src="
              `${path}/images/users/${$props.profil.imageFilePath}` ||
              '../image/avatar.png'
            "
            :lazy-src="defaultImage"
          ></v-img>
        </v-avatar>
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
        :rules="[
          (value) =>
            !value || value.size < 2000000 || 'L\'image est obligatoire',
        ]"
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

  computed: {
    path() {
      return process.env.NUXT_ENV_PATH
    },
    defaultImage() {
      return process.env.NUXT_ENV_IMAGE
    },
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

