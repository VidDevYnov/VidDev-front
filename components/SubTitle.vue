<template>
  <h3 class="text-start ma-5">{{ name }}</h3>
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