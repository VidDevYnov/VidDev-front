<template>
  <v-row>
    <v-col col="12" sm="12" md="12" lg="12" class="d-flex justify-center">
      <div class="ma-1">
        <v-select
          v-model="filter.categories"
          menu-props="auto"
          label="Catégorie"
          :items="getCategory"
          hide-details
          single-line
        ></v-select>

        <v-select
          v-model="filter.sizes"
          menu-props="auto"
          label="Taille"
          :items="getSizes"
          hide-details
          single-line
        ></v-select>
      </div>
      <div class="ma-1">
        <v-select
          v-model="filter.types"
          menu-props="auto"
          label="Type"
          :items="getTypes"
          hide-details
          single-line
        ></v-select>

        <v-select
          v-model="filter.materials"
          menu-props="auto"
          label="Matière"
          :items="getMaterials"
          hide-details
          single-line
        ></v-select>
      </div>
      <div class="ma-1">
        <v-select
          v-model="filter.states"
          menu-props="auto"
          label="Etat"
          :items="getStates"
          hide-details
          single-line
        ></v-select>

        <v-btn
          class="ma-4 d-flex"
          color="#417D7A"
          style="color: white"
          @click="getArticles"
        >
          Filtrer</v-btn
        >
      </div>
    </v-col>
  </v-row>
</template>
<script>
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
         }
         },
computed: {
    getCategory() {
      return this.getFilter(this.$store.state.articles.categories)
    },
    getSizes() {
      return this.getFilter(this.$store.state.articles.sizes)
    },
    getTypes() {
      return this.getFilter(this.$store.state.articles.types)
    },
    getMaterials() {
      return this.getFilter(this.$store.state.articles.materials)
    },
    getStates() {
      return this.getFilter(this.$store.state.articles.states)
    },
},
  created() {
    this.getArticlesFilter()
  },
  methods: {
    async getArticlesFilter() {
      await this.$store.dispatch('articles/getArticlesFilter')
    },
    getFilter(tab) {
      if (tab.length > 0){
        const nameFilter = []
        for (
          let index = 0;
          index < tab.length;
          index++
        ) {
          nameFilter.push({text: tab[index].worded,
          value:  tab[index].id })
        }
        return nameFilter
      }
      return []
    },
    async getArticles() {
      await this.$store.dispatch('articles/setArticlesFilter', {
        url: `/api/articles?page=1&articleCategory=${this.filter.categories}&articleSize=${this.filter.sizes}&articleState=${this.filter.states}&articleType=${this.filter.types}&articleMaterial=${this.filter.materials}`
      })
    },
  },
}
</script>
