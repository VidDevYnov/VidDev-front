<template>
  <div class="text-center">
    <v-snackbar v-model="open" class="mb-8" :timeout="3000" :color="type.color">
      <div class="d-flex">
        <v-icon class="mr-4">{{ `mdi-${type.icon}` }}</v-icon>
        <div class="d-flex align-center mt-1">
          {{ notification.description }}
        </div>
        <v-spacer></v-spacer>
        <v-icon class="ml-2" @click="$store.commit('notification/delete', $props.id)"
          >mdi-close</v-icon
        >
      </div>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  computed: {
    open: {
      get() {
        return this.notification.open
      },
      set() {
        this.$store.commit('notification/delete', this.$props.id)
      },
    },
    type() {
      return this.notification.type === 'success'
        ? { color: '#76d9a3', icon: 'check' }
        : { color: 'red', icon: 'alert' }
    },
    notification() {
      return this.$store.state.notification.list.find(
        (notification) => notification.id === this.$props.id
      )
    },
  },
  mounted() {
    this.$store.commit('notification/open', this.$props.id)
  },
}
</script>
