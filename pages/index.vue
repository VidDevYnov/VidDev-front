<template>

  <v-row justify="center" align="center">
  
    <v-col cols="12" sm="8" md="6">
    <v-row justify="center" align="center">
    <MenuFemme />
    <MenuHomme />
    <MenuEnfant />
</v-row>
      
</br>
      <v-img
      height="200"
      width="900"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>
</br>
     <v-title align="center">Nos derniers articles</v-title>
     
      <v-row>
      
        <LastArticles />
        <LastArticles />
        <LastArticles />
        <LastArticles />
        <LastArticles />
        <LastArticles />
        </v-row>
      
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>

