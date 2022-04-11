<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <MenuFemme />
        <MenuHomme />
        <MenuEnfant />
        
      </v-card>

      <v-img
      height="200"
      width="600"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

      <v-card>
        <v-card-title  class="logo py-4 d-flex justify-center">
          Nos Derniers Articles
        </v-card-title>
        
        <v-row> <LastArticles /> 
         <LastArticles />
          <LastArticles />
           <LastArticles /> </v-row >
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
