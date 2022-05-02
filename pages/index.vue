<template>
  <div>
    <v-row class="justify-space-around ma-5">
      <div v-for="item in items" :key="item.title">
        <MenuDropDown :items="item" /></div
    ></v-row>

    <div>
      <v-img height="400" src="share.jpg"></v-img>
    </div>

    <v-card-title class="logo py-4 d-flex justify-center">
      Nos Derniers Articles
    </v-card-title>

    <v-row class="justify-space-around ma-5">
      <AllArticles />
      <AllArticles />
      <AllArticles />
      <AllArticles />
      <AllArticles />
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
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
}
</script>
