<template>
      <PaymentRecapOrder :article="article" :profil="profil" />
</template>

<script>
export default {
  computed: {
    article() {
      const article = this.$store.state.articles.article
      if (article.length !== 0) {
        return article
      }
      return {}
    },
    profil() {
      const profil = this.$store.state.user.profil
      if (profil.length !== 0) {
        return profil
      }
      return {}
    },
  },
  created() {
    this.getArticle()
    this.getProfil()
  },
  methods: {
    async getArticle() {
      await this.$store.dispatch('articles/setArticle', {
        idArticle: this.$route.params.id,
      })
    },
    async getProfil() {
      await this.$store.dispatch('user/setProfil')
    },
  },
}
</script>
