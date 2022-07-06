<template>
  <div>
    <ProfilHeader class="my-4" :profil="profil" />
    <PaymentRecapOrder :article="article" :profil="profil" />
  </div>
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
  async created() {
    await this.getArticle()
    this.checkCanChange()
  },
  methods: {
    async getArticle() {
      await this.$store.dispatch('articles/setArticle', {
        idArticle: this.$route.params.id,
      })
    },

    checkCanChange() {
      if (this.article.orderArticle) {
        this.$router.push('/')
      }
    },
  },
}
</script>
