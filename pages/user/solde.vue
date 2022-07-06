<template>
  <div>
    <Title name="Mon solde" />
    <SubTitle
      class="ma-2 text-center"
      :name="`Votre solde actuel est de ${profil.solde || 0} €`"
    />
    <v-row class="justify-center ma-5">
      <NuxtLink to="/user/creditAccount" class="text-decoration-none ma-5">
        <v-btn class="ma-2" outlined>Créditer</v-btn>
      </NuxtLink>
      <NuxtLink to="/user/withdrawAccount" class="text-decoration-none ma-5">
        <v-btn class="ma-2" outlined>Retirer</v-btn>
      </NuxtLink>
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
}
</script>