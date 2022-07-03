<template>
  <div>
    <v-form v-model="isFormValid">
      <div class="d-flex justify-center ma-5">
        <v-col cols="12" sm="10" md="6" lg="4"
          ><v-text-field
            v-model="login.username"
            label="Email"
            outlined
            :rules="emailRules"
          >
          </v-text-field>
          <v-text-field
            v-model="login.password"
            :append-icon="isPassDisabled ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="isPassDisabled ? 'text' : 'password'"
            label="Mot de passe"
            outlined
            @click:append="isPassDisabled = !isPassDisabled"
          ></v-text-field>
        </v-col>
      </div>
    </v-form>
    <div class="d-flex justify-center ma-5">
      <v-btn :disabled="!isFormValid" outlined @click="userLogin">
        Connexion</v-btn
      >
    </div>
    <NuxtLink
      to="/auth/register"
      class="text-decoration-none ma-10 d-flex align-center d-flex justify-center"
      style="color : white"
    >
      Pas de compte ? Inscrivez-vous
    </NuxtLink>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFormValid: false,
      isPassDisabled: false,
      login: {
        username: '',
        password: '',
      },

      passwordRules: [
        (value) => !!value || 'Entrez un mot de passe',
        (value) => (value && value.length >= 6) || 'Minimum 6 caractère',
      ],

      emailRules: [
        (v) => !!v || 'Veuillez entrer votre email',
        (v) => /.+@.+\..+/.test(v) || "Le mail n'est pas valide",
      ],
    }
  },

  methods: {
    async userLogin() {
      await this.$store.dispatch('login/connection', { user: this.login })
      setInterval(this.refreshToken, 3000000)
    },

    async refreshToken() {
      await this.$store.dispatch('login/refreshToken')
    },
  },
}
</script>