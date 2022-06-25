<template>
  <div>
    <Title name="Retirer de l'argent de votre compte" />

    <AccountModifySolde type="withdraw" />
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