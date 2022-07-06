<template>
  <div>
    <Title name="Détails de l'article" />
    <v-row class="d-flex ma-0 pa-0 justify-space-around">
      <v-col
        cols="12"
        sm="8"
        md="5"
        lg="4"
        class="d-flex justify-center align-center"
      >
        <ArticlesImage
          :path="`${path}/images/articles/${article.imageFilePath}`"
        />
      </v-col>

      <v-col cols="10" sm="6" md="4" lg="3">
        <ArticlesInfo :article="article" />
      </v-col>
      <v-col cols="10" sm="6" md="12" lg="5" class="ma-0 pa-2">
        <v-col cols="12" md="6" lg="12" class="ma-0 pa-0">
          <v-card class="pa-4 ma-1">
            <p class="ml-2">Description:</p>
            <p class="ml-4">{{ article.description }}</p>
          </v-card>
        </v-col>
      </v-col>
    </v-row>
    <SubTitle name="Autre article" class="my-5" />
    <MemberDressing :articles="articles" />
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
    articles() {
      const articles = this.$store.state.articles.userArticles
      if (articles.length !== 0) {
        return articles
      }
      return {}
    },
    path() {
      return process.env.NUXT_ENV_PATH
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
      await this.getArticleUser()
    },

    async getArticleUser() {
      await this.$store.dispatch(
        'member/setMember',
        this.$store.state.articles.article.user.id
      )
      await this.$store.dispatch(
        'articles/setUserArticles',
        this.$store.state.articles.article.user.id
      )
    },
  },
}
</script>

<style>
@media screen and (min-width: 600px) {
  .img {
    flex-direction: column;
    align-items: center;
  }
}
</style>


