<template>
  <v-col cols="6"
    ><v-card class="pa-5">
      <p
        class="red--text text--lighten-1"
      >
        Attention si vous changez votre mot de passe vous allez être déconnecté
      </p>
      <v-form v-model="isFormValid">
        <TextField
          :get="$props.email"
          :rules="emailRules"
          label="Mail *"
          :fieldName="['user', 'profil', 'email']"
        />
      </v-form>

      <v-row class="justify-center">
        <v-btn
          :disabled="!isFormValid"
          outlined
          class="mb-5"
          @click="modifyEmail()"
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
    email: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isFormValid: false,

      emailRules: [
        (v) => !!v || 'Veuillez entrer votre email',
        (v) => /.+@.+\..+/.test(v) || "Le mail n'est pas valide",
      ],
    }
  },

  methods: {
    async modifyEmail() {
      await this.$store.dispatch('user/modifyProfil', {
        user: {
          email: this.$props.email,
        },
        idUser: this.$store.state.user.profil.id,
      })
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('token')
      this.$router.push('/auth/login')
    },
  },
}
</script>