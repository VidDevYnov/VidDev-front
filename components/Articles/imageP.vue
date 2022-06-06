<template>
  <v-img class="ma-1" :src="$props.path" height="70vh"></v-img>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      required: true,
    },
  },
}
</script>