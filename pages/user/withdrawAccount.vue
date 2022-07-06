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
}
</script>