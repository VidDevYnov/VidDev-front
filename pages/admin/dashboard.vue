<template>
  <div class="d-flex flex-column justify-center" style="height: 100%">
    <Title name="Tableau de bord" />

    <v-row>
      <v-col cols="4" class="d-flex justify-center">
        <NuxtLink to="/admin/filter" class="text-decoration-none ma-5 d-flex align-center">
          <v-btn class="ma-2" outlined> Gestion des filtres </v-btn>
        </NuxtLink>
      </v-col>
      <v-col cols="4" class="d-flex justify-center">
        <NuxtLink to="/admin/filter" class="text-decoration-none ma-5 d-flex align-center">
          <v-btn class="ma-2" outlined> Gestion des articles </v-btn>
        </NuxtLink>
      </v-col>
      <v-col cols="4" class="d-flex justify-center">
        <NuxtLink to="/admin/filter" class="text-decoration-none ma-5 d-flex align-center">
          <v-btn class="ma-2" outlined> Gestion des utlisateurs </v-btn>
        </NuxtLink>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {}
</script>