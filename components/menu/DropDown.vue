<template>
  <div class="text-center" >
    <v-menu offset-y >
      <template #activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on" style="color: white">
          {{ $props.items.title }}
        </v-btn>
      </template>
      <v-list >
        <v-list-item v-for="(item, index) in items.articles" :key="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>


<script>
export default {
  props: {
    items: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      closeOnContentClick: true,
    }
  },
}
</script>