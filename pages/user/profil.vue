<template>
  <div class="d-flex flex-column justify-center">
    <Title name="Profil" />
    <ProfilHeader />
    <ProfilInformations />
    <SubTitle name="Vide dressing" />
    <v-row class="justify-space-around my-3 mx-0">
      <ArticlesCardAdd />
      <v-col
        v-for="(article, index) in $store.state.user.profil.articles"
        :key="index"
        cols="7"
        sm="4"
        md="3"
        lg="2"
      >
        <ArticlesCardModify :article="article" />
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  created() {
    this.profil()
  },

  methods: {
    async profil() {
      await this.$store.dispatch('user/setProfil')
    },
  },
}
</script>

