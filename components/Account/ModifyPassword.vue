<template>
  <v-col cols="6"
    ><v-card class="pa-5">
      <v-form v-model="isFormValid">
        <v-text-field
          v-model="password"
          :append-icon="isPassDisabled ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          :type="isPassDisabled ? 'text' : 'password'"
          label="Mot de passe"
          outlined
          @click:append="isPassDisabled = !isPassDisabled"
        ></v-text-field>
        <v-text-field
          v-model="confirmPassword"
          :append-icon="isConfirmPassDisabled ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordConfirmationRules"
          :type="isConfirmPassDisabled ? 'text' : 'password'"
          label="Confirmation du mot de passe"
          outlined
          @click:append="isConfirmPassDisabled = !isConfirmPassDisabled"
        ></v-text-field>
      </v-form>
      <v-row class="justify-center ma-5">
        <v-btn
          :disabled="!isFormValid"
          color="#417D7A"
          style="color: white"
          @click="modifyPassword"
        >
          Enregistrer</v-btn
        >
      </v-row>
    </v-card>
  </v-col>
</template>    


<script>
export default {
  data() {
    return {
      isFormValid: false,
      isPassDisabled: false,
      isConfirmPassDisabled: false,
      password: '',
      confirmPassword: '',

      passwordRules: [
        (value) => !!value || 'Entrez un mot de passe',
        (value) => (value && value.length >= 6) || 'Minimum 6 caractère',
      ],

      passwordConfirmationRules: [
        (value) => !!value || 'Veuillez entrer votre mot de passe.',
        (value) =>
          value === this.password || 'Les mots de passe ne correspondent pas',
      ],
    }
  },

  methods: {
    async modifyPassword() {
      await this.$store.dispatch('user/modifyProfil', {
        user: {
          plainPassword: this.password,
        },
        idUser: this.$store.state.user.profil.id,
      })
    },
  },
}
</script>
    
