
<template>
  <v-card class="ma-5" max-width="250" color="light" light>
    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            alt=""
            :src="article.user.profilPicture"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ article.user.firstName }} {{ article.user.lastName }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card-actions>

    <v-img
      height="200"
      width="250"
     :src="article.images[0].path"
    ></v-img>
 
   <div  class="ma-2">Prix: {{ article.price }},00€</div>
    
  <div class="ma-2">Taille: {{ article.articleSize.worded }}</div>
  
  <div class="ma-2">Marque: {{ article.brand }}</div>

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
}
</script>
