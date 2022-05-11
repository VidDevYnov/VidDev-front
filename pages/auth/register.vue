<template>
  <div>
    <h2 class="text-center ma-5">Inscription</h2>
    <v-form v-model="isFormValid">
      <v-row class="justify-center ma-5">
        <v-col cols="12" offset-xs="12" sm="12" md="6" lg="4"
          ><v-text-field
            v-model="register.lastName"
            outlined
            label="Nom"
            :rules="lastNameRules"
          ></v-text-field>
          <v-text-field
            v-model="register.firstName"
            label="Prénom"
            outlined
            :rules="firstNameRules"
          ></v-text-field>
          <v-text-field
            v-model="register.email"
            label="Email"
            outlined
            :rules="emailRules"
          ></v-text-field>
          <v-text-field
            v-model="register.password"
            label="Mot de passe"
            outlined
            :rules="passwordRules"
          ></v-text-field>
          <v-text-field
            v-model="confirmPassword"
            label="Confirmation du mot de passe"
            outlined
            :rules="passwordConfirmationRules"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
    <v-row class="justify-center ma-5">
      <v-btn
        :disabled="!isFormValid"
        color="#417D7A"
        style="color: white"
        @click="create"
      >
        Inscription</v-btn
      >
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFormValid: false,
      register: {
        lastName: '',
        firstName: '',
        email: '',
        password: '',
        roles: [],
      },
      confirmPassword: '',

      passwordRules: [
        (value) => !!value || 'Entrez un mot de passe',
        (value) => (value && value.length >= 6) || 'Minimum 6 caractère',
      ],

      firstNameRules: [(value) => !!value || 'Entrez un prénom'],

      lastNameRules: [(value) => !!value || 'Entrez un nom'],

      passwordConfirmationRules: [
        (value) => !!value || 'Veuillez entrer votre mot de passe.',
        (value) =>
          value === this.register.password ||
          'Les mots de passe ne correspondent pas',
      ],

      emailRules: [
        (v) => !!v || 'Veuillez entrer votre email',
        (v) => /.+@.+\..+/.test(v) || "Le mail n'est pas valide",
      ],
    }
  },

  methods: {
    async create() {
      await this.$store.dispatch('user/createUser', { user: this.register })
    },
  },
}
</script>