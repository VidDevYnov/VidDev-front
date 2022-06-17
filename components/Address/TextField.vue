<template>
  <v-text-field
    v-model="field"
    :rules="$props.rules"
    :label="$props.label"
    outlined
  ></v-text-field>
</template>     
<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    rules: {
      type: Array,
      required: false,
      default: () => [],
    },
    get: {
      type: String,
      required: true,
      default: () => '',
    },
    fieldName: {
      type: String,
      required: true,
    },
    idAddress: {
      type: Number,
      required: true,
      default: () => 0,
    },
  },

  computed: {
    field: {
      get() {
        return this.$props.get
      },
      set(value) {
        this.$store.commit('user/modifyAddress', {
          fieldName: this.$props.fieldName,
          idAddress: this.$props.idAddress,
          value,
        })
      },
    },
  },
}
</script>
           
