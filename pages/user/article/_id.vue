<template>
  <div>
    <Title name="Modifier de l'article" />
    <div class="ma-5">
      <EditArticlesFormEdit :article="article" />
    </div>
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
      if (this.article.user.id !== this.$store.state.user.profil.id) {
        this.$router.push('/')
      }
    },
  },
}
</script>


