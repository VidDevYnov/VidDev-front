<template>
  <div>
    <v-card-title class="logo py-4 d-flex justify-center" style="color: white">
      <h2 style>Détails de l'article</h2>
    </v-card-title>
  


    <v-row class="d-flex justify-space-around">
    
      <v-col cols="12" sm="8" md="5" lg="4" class="d-flex justify-center">
      <ArticlesImageP/>
        </v-col>
      
       <ArticlesImages/>
   
        <v-col cols="12" sm="12" md="4" lg="4" class="d-flex justify-center">
        <ArticlesInfo />
          </v-col>
     
    </v-row>
    
    <p class="ml-5">Description: {{ $store.state.articles.article.description }}</p>
  </div>
</template>


<script>

export default {

 created() {
    this.getArticle()
  },
  methods: {
    async getArticle() {
      await this.$store.dispatch('articles/setArticle', { idArticle: this.$route.params.id })
 
    },
  },
}
</script>


