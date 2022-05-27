<template>
  <h2 class="text-center ma-5 headline">{{ name }}</h2>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
}
</script>