<template>
  <div class="d-flex flex-column justify-center">
    <Title name="Profil" />
    <ProfilHeader :profil="profil" />
    <ProfilInformations :profil="profil" />
    <SubTitle name="Vide dressing" />
    <v-row class="justify-space-around my-3 mx-0">
      <ArticlesCardAdd />
      <v-col
        v-for="(article, index) in articles"
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
  computed: {
    profil() {
      const profil = this.$store.state.user.profil
      if (profil?.addresses?.length > 0) {
        profil.address = `${profil.addresses[0].address} ${profil.addresses[0].postalCode} ${profil.addresses[0].city} ${profil.addresses[0].country}`
      }
      return profil.length === 0 ? {} : profil
    },
    articles() {
      const articles = this.$store.state.articles.userArticles
      if (articles.length !== 0) {
        return articles
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
      await this.$store.dispatch('articles/setUserArticles', this.profil.id)
    },
  },
}
</script>

