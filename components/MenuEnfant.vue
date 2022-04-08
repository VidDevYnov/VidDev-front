<template>
  <div class="text-center">
    
    <v-menu
      top
      :close-on-content-click="closeOnContentClick"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="black"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Enfants
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
  export default {
    data: () => ({
      items: [
        { title: 'Vêtements' },
        { title: 'Chaussures' },
        { title: 'Sacs' },
        { title: 'Tous' },
        
      ],
      closeOnContentClick: true,
    }),
  }
</script>