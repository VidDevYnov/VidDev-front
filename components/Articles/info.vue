<template>
  <v-card class="pa-5 justify-center" width="300">
    <p class="ml-2">
      Nom de l'article: {{ $store.state.articles.article.name }}
    </p>
    <p class="ml-2">Prix: {{ $store.state.articles.article.price }},00€</p>
    <p class="ml-2">
      Taille:
      {{ size }}
    </p>
    <p class="ml-2">Catégorie: {{ category }}</p>
    <p class="ml-2">Matière: {{ material }}</p>
    <p class="ml-2">Marque: {{ $store.state.articles.article.brand }}</p>
    <p class="ml-2">Etat: {{ state }}</p>
    <p class="ml-2">Couleur: {{ $store.state.articles.article.color }}</p>
    
      <v-btn color="#417D7A" style="color: white" width="220" class="ma-1 ml-5"> FAVORIS</v-btn>
      
      <v-btn color="#417D7A" style="color: white" width="220" class="ma-1 ml-5"> ACHETER</v-btn>
    
  </v-card>
</template>

<script>
export default {
  computed: {
    size() {
      if (
        typeof this.$store.state.articles.article.articleSize !== 'undefined'
      ) {
        console.log(typeof this.$store.state.articles.article.articleSize)
        return this.$store.state.articles.article.articleSize.worded
      }
      return 'Pas de taille'
    },

    category() {
      if (
        typeof this.$store.state.articles.article.articleCategory !==
        'undefined'
      ) {
        console.log(typeof this.$store.state.articles.article.articleCategory)
        return this.$store.state.articles.article.articleCategory.worded
      }
      return 'Pas de categorie'
    },

    material() {
      if (
        typeof this.$store.state.articles.article.articleMaterial !==
        'undefined'
      ) {
        console.log(typeof this.$store.state.articles.article.articleMaterial)
        return this.$store.state.articles.article.articleMaterial.worded
      }
      return 'Pas de material'
    },

    state() {
      if (
        typeof this.$store.state.articles.article.articleState !== 'undefined'
      ) {
        console.log(typeof this.$store.state.articles.article.articleState)
        return this.$store.state.articles.article.articleState.worded
      }
      return "Pas d'état"
    },
  },
}
</script>
