<template>
  <div>
    <Title name="Créditer votre compte" />

    <SubTitle
      class="ma-2"
      :name="`Votre solde actuel est de ${profil.solde || 0} €`"
    />

    <AccountModifySolde />
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