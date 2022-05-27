<template>
  <v-card
    color="light"
    light
    height="250px"
    class="d-flex justify-center align-center"
  >
    <v-img height="250px" :src="article.images[0].path"></v-img>
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