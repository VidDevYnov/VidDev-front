<template>
  <div>
    <Title name="Détails de l'article" />
    <v-row class="d-flex ma-0 pa-0 justify-space-around align-center">
      <v-col
        cols="12"
        sm="8"
        md="5"
        lg="5"
        class="d-flex justify-center align-center"
      >
        <ArticlesImageP :path="getImagePrincPath(article.images)" />
      </v-col>

      <v-col
        v-if="getImageSecPath(article.images) != ''"
        cols="12"
        sm="4"
        md="3"
        lg="4"
        class="d-flex img"
      >
        <ArticlesImages
          v-for="(image, index) in getImageSecPath(article.images)"
          :key="index"
          :path="image.path"
        />
      </v-col>

      <v-col cols="10" sm="6" md="4" lg="3">
        <ArticlesInfo :article="article" />
      </v-col>
      <v-col cols="10" sm="6" md="12" lg="12" class="ma-0">
        <v-col cols="12" md="5" lg="5" class="ma-0 pa-0 pr-4">
          <v-card class="pa-4 ma-1">
            <p class="ml-2">Description:</p>
            <p class="ml-4">{{ article.description }}</p>
          </v-card>
        </v-col>
      </v-col>
    </v-row>
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
    getImagePrincPath() {
      return (image) => {
        if (typeof image !== 'undefined') {
          return image[0].path
        }
        return ''
      }
    },
    getImageSecPath() {
      return (image) => {
        if (typeof image !== 'undefined') {
          const ListImage = []

          for (let i = 1; i < image.length; i++) {
            ListImage.push(image[i])
          }
          return ListImage
        }
        return ''
      }
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

<style>
@media screen and (min-width: 600px) {
  .img {
    flex-direction: column;
    align-items: center;
  }
}
</style>


