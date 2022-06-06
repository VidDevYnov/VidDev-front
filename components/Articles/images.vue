<template>
  <v-img
    @click.stop="dialog = true"
    class="ma-1 size"
    width="90"
    :src="$props.path"
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
}
</script>

<style>
@media screen and (min-width: 600px) {
  .size {
    width: auto !important;
  }
}

@media screen and (min-width: 600px) {
  .size {
    height: 35vh;
  }
}
</style>


