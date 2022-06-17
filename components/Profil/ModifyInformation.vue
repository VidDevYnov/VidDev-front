<template>
  <v-col cols="12" md="5">
    <v-card color="pa-5">
      <v-form v-model="isFormValid">
        <TextField
          :get="$props.profil.lastName"
          :rules="[(v) => !!v || 'Veuillez entrer votre nom']"
          label="Nom *"
          :fieldName="['user', 'profil', 'lastName']"
        />

        <TextField
          :get="$props.profil.firstName"
          :rules="[(v) => !!v || 'Veuillez entrer votre prénom']"
          label="Prénom *"
          :fieldName="['user', 'profil', 'firstName']"
        />

        <TextArea
          :get="$props.profil.bio"
          label="Bio"
          :fieldName="['user', 'profil', 'bio']"
        />
      </v-form>
      <v-row class="justify-center">
        <v-btn
          :disabled="!isFormValid"
          outlined
          class="mb-5"
          @click="modifyProfil()"
        >
          Enregistrer</v-btn
        >
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
      isFormValid: false,
    }
  },

  methods: {
    async modifyProfil() {
      await this.$store.dispatch('user/modifyProfil', {
        user: {
          bio: this.profil.bio,
          firstName: this.profil.firstName,
          lastName: this.profil.lastName,
          profilPicture: this.profil.profilPicture,
        },
        idUser: this.profil.id,
      })
    },
  },
}
</script>