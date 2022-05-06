<template>
  <v-app style="background-color: #1e1e1e">
    <MenuNavBar />
    <v-main>
      <v-container fluid class="pa-0" style="height: 100%">
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer><span>Hello</span></v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>
