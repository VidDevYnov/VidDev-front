<template>
  <div>
    <Title name="Modification des paramètres du compte" />
    <v-row class="ma-5">
      <AccountModifyEmail :email="email" />
      <AccountModifyPassword />
    </v-row>
  </div>
</template>

<script>
export default {
  computed: {
    email() {
      const email = this.$store.state.user.profil.email
      if (email) {
        return email
      }
      return ""
    },
  },
}
</script>