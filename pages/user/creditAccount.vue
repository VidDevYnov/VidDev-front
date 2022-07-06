<template>
  <div>
    <Title name="Créditer votre compte" />

    <AccountModifySolde type="credit" />
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