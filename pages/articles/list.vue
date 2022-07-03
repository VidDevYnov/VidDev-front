<template>
  <div>
    <v-col col="12" sm="12" md="12" lg="12" class="d-flex justify-center">
      <v-card class="ma-5 pa-5" color="light" light>
        <v-row>
          <v-col col="12" sm="12" md="12" lg="12" class="d-flex justify-center">
            <div class="ma-1">
              <v-select
                v-model="filter.categories"
                menu-props="auto"
                label="Catégorie"
                :items="setFilter($store.state.articles.categories)"
                hide-details
                single-line
              ></v-select>

              <v-select
                v-model="filter.sizes"
                menu-props="auto"
                label="Taille"
                :items="setFilter($store.state.articles.sizes)"
                hide-details
                single-line
              ></v-select>
            </div>
            <div class="ma-1">
              <v-select
                v-model="filter.types"
                menu-props="auto"
                label="Type"
                :items="setFilter($store.state.articles.types)"
                hide-details
                single-line
              ></v-select>

              <v-select
                v-model="filter.materials"
                menu-props="auto"
                label="Matière"
                :items="setFilter($store.state.articles.materials)"
                hide-details
                single-line
              ></v-select>
            </div>
            <div class="ma-1">
              <v-select
                v-model="filter.states"
                menu-props="auto"
                label="Etat"
                :items="setFilter($store.state.articles.states)"
                hide-details
                single-line
              ></v-select>

              <v-btn
                outlined
                color="black"
                class="ma-4 d-flex"
                style="color: white"
                @click="getArticles(1)"
              >
                Filtrer</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-col>

    <v-row class="justify-space-around ma-5">
      <ArticlesCard
        v-for="article in $store.state.articles.articles"
        :key="article.id"
        :article="article"
        :user="article.user"
      />
    </v-row>
    <div v-if="pageNumber != 0" class="text-center">
      <v-pagination
        v-model="page"
        :length="pageNumber"
        @input="getArticles(page)"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { tryGetPage } from '../../services/pageHelper'

export default {
  data() {
    return {
      filter: {
        categories: '',
        sizes: '',
        types: '',
        materials: '',
        states: '',
      },
      page: 1,
    }
  },
  computed: {
    setFilter() {
      return (stateFiltre) => {
        if (stateFiltre.length > 0) {
          const tabFilter = []
          stateFiltre.map(function (value, key) {
            return tabFilter.push({
              text: stateFiltre[key].worded,
              value: stateFiltre[key].id,
            })
          })
          return tabFilter
        }
        return []
      }
    },
    article() {
      const article = this.$store.state.articles.article
      if (article.length !== 0) {
        return article
      }
      return {}
    },
    pageNumber() {
      if (this.$store.state.articles.lastPageUrl) {
        return tryGetPage(this.$store.state.articles.lastPageUrl)
      }
      return 0
    },
  },
  created() {
    this.getFilter()
    this.getArticles(1)
  },

  methods: {
    async getFilter() {
      await this.$store.dispatch('articles/getArticlesFilter')
    },
    async getArticles(page) {
      await this.$store.dispatch('articles/setArticlesFilter', {
        url: `/api/articles?articleCategory=${this.filter.categories}&articleSize=${this.filter.sizes}&articleState=${this.filter.states}&articleType=${this.filter.types}&articleMaterial=${this.filter.materials}&page=${page}&exists[orderArticle]=false`,
      })
    },
  },
}
</script>
