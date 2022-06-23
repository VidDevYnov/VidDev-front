
<template>
  <div>
    <NuxtLink :to="`/articles/${article.id}`" class="text-decoration-none">
      <v-card class="ma-5 pa-1" max-width="250" color="light" light>
        <v-card-actions>
          <v-list-item class="grow">
            <v-list-item-avatar color="grey darken-3">
              <v-img
                class="elevation-6"
                alt=""
                :src="`http://localhost:8000/images/users/${article.user.imageFilePath}`"
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
          :src="`http://localhost:8000/images/articles/${article.imageFilePath}`"
        ></v-img>

        <div class="ma-2">Prix: {{ article.price }},00€</div>

        <div class="ma-2">Taille: {{ article.articleSize.worded }}</div>

        <div class="ma-2">Marque: {{ article.brand }}</div>
      </v-card>
    </NuxtLink>
  </div>
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
