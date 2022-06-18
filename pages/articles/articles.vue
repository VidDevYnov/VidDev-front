<template>
  <v-container>
    <v-col col="12" sm="12" md="12" lg="12" class="d-flex justify-center">
      <v-card class="ma-5 pa-5" color="light" light>
        <Filtre />
      </v-card>
    </v-col>

    <v-row class="justify-space-around ma-5">
      <ArticlesCard
        v-for="article in $store.state.articles.articles"
        :key="article.id"
        :article="article"
        :current-page="currentPage"
        :per-page="perPage"
      />
    </v-row>

    <div class="text-center">
      <v-pagination
        v-model="currentPage"
        :length="3"
        :per-page="perPage"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      perPage: 3,
      currentPage: 1,
      filter: {
        categories: '',
        sizes: '',
        types: '',
        materials: '',
        states: '',
      },
    }
  },
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
    this.getArticles()
  },

  methods: {
    async getArticles() {
      await this.$store.dispatch('articles/setArticlesFilter', {
        url: `/api/articles?page=1&articleCategory=${this.filter.categories}&articleSize=${this.filter.sizes}&articleState=${this.filter.states}&articleType=${this.filter.types}&articleMaterial=${this.filter.materials}`
      })
    },
  },
}
</script>
