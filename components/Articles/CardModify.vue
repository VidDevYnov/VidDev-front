<template>
  <NuxtLink :to="`/user/article/${article.id}`" class="text-decoration-none">
    <v-card
      color="light"
      light
      height="250px"
      class="d-flex justify-center align-center"
    >
      <v-img
        height="250px"
        :src="`http://localhost:8000/images/articles/${article.imageFilePath}`"
      ></v-img>
    </v-card>
  </NuxtLink>
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