<template>
  <div>
    <div>
      <v-img height="400" src="image/share.jpg"></v-img>
    </div>
    <Title name="Nos derniers articles " />
    <v-row class="justify-space-around ma-5">
      <ArticlesCard
        v-for="article in $store.state.articles.articles"
        :key="article.id"
        :article="article"
        :user="article.user"
      />
    </v-row>
  </div>
</template>

<script>
export default {
  created() {
    this.getArticles()
  },
  methods: {
    async getArticles() {
      await this.$store.dispatch('articles/setArticles')
    },
  },
}
</script>
