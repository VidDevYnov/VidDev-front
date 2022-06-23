<template>
  <v-card class="pa-4 ma-1 d-flex flex-column justify-space-around">
    <p class="ml-2">Nom de l'article: {{ $props.article.name }}</p>
    <p class="ml-2">Prix: {{ $props.article.price }},00€</p>
    <p class="ml-2">
      Taille:
      {{ getWorded($props.article.articleSize) }}
    </p>
    <p class="ml-2">
      Catégorie: {{ getWorded($props.article.articleCategory) }}
    </p>
    <p class="ml-2">Matière: {{ getWorded($props.article.articleMaterial) }}</p>
    <p class="ml-2">Marque: {{ $props.article.brand }}</p>
    <p class="ml-2">Etat: {{ getWorded($props.article.articleState) }}</p>
    <p class="ml-2">Couleur: {{ $props.article.color }}</p>

    <div class="d-flex flex-column align-center">
      <v-btn outlined width="220" class="ma-2"> FAVORIS</v-btn>

      <v-btn outlined width="220" class="ma-2"> ACHETER</v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getWorded() {
      return (type) => {
        if (typeof type !== 'undefined') {
          return type.worded
        }
        return type
      }
    },
  },
}
</script>
