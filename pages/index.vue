<template>
  <div>
    <v-row class="justify-space-around ma-5">
      <div v-for="item in items" :key="item.title">
        <MenuDropDown :items="item" /></div
    ></v-row>

    <div>
      <v-img height="400" src="share.jpg"></v-img>
    </div>

    <Title name="Nos derniers articles " />
    <v-row class="justify-space-around ma-5">
      <ArticlesCard
        v-for="article in $store.state.articles.articles"
        :key="article.id"
        :article="article"
      />
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'Femmes',
          articles: [
            { title: 'Vêtements', to: '' },
            { title: 'Chaussures', to: '' },
            { title: 'Sacs', to: '' },
            { title: 'Tous', to: '' },
          ],
        },
        {
          title: 'Hommes',
          articles: [
            { title: 'Vêtements', to: '' },
            { title: 'Chaussures', to: '' },
            { title: 'Sacs', to: '' },
            { title: 'Tous', to: '' },
          ],
        },
        {
          title: 'Enfants',
          articles: [
            { title: 'Vêtements', to: '' },
            { title: 'Chaussures', to: '' },
            { title: 'Sacs', to: '' },
            { title: 'Tous', to: '' },
          ],
        },
      ],
    }
  },
  created() {
    this.getArticles()
  },
  methods: {
    async getArticles() {
      await this.$store.dispatch('articles/setArticles')
    },
  },
}
</script>
