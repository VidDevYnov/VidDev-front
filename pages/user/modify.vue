<template>
  <div>
    <Title name="Modification du profil" />
    <v-row class="ma-5">
      <ProfilModifyImage :profil="profil" />
      <ProfilModifyInformation :profil="profil" />
      <ProfilModifyAddress :profil="profil" />
    </v-row>
  </div>
</template>

<script>
export default {
  computed: {
    profil() {
      const profil = this.$store.state.user.profil
      if (profil.length !== 0) {
        return profil
      }
      return {}
    },
  },
  created() {
    this.getProfil()
  },

  methods: {
    async getProfil() {
      await this.$store.dispatch('user/setProfil')
    },
  },
}
</script>