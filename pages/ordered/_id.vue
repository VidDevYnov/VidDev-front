<template>
  <div class="d-flex">
    <PaymentRecapOrder :article="article" />
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

    created() {
      this.getArticle()
    },
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
