<template>
  <v-row class="justify-space-around my-3 mx-0">
    <v-col
      v-for="(article, index) in $props.member.articles"
      :key="index"
      cols="10"
      sm="6"
      md="5"
      lg="3"
    >
      <ArticlesCard :article="article" :user="member" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    member: {
      type: Object,
      required: true,
    },
  },
}
</script>