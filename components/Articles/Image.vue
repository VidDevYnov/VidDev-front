<template>
  <v-img
    class="ma-1"
    :src="$props.path"
    :lazy-src="defaultImage"
    max-height="450px"
    max-width="350px"
  ></v-img>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      required: true,
    },
  },

  computed: {
    defaultImage() {
      return process.env.NUXT_ENV_IMAGE
    },
  },
}
</script>