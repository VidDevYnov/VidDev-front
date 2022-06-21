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
  created() {
    this.getArticle()
  },
  methods: {
    async getArticle() {
      await this.$store.dispatch('articles/setArticle', {
        idArticle: this.$route.params.id,
      })
    },
  },
}
</script>


