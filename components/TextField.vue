<template>
  <v-text-field
    v-model="field"
    :label="$props.label"
    outlined
    :rules="$props.rules"
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
      type: Array,
      required: true,
    },
  },
  computed: {
    field: {
      get() {
        return this.$props.get
      },
      set(value) {
        this.$store.commit(this.$props.fieldName[0] + '/setValue', {
          stateName: this.$props.fieldName[1],
          fieldName: this.$props.fieldName[2],
          value,
        })
      },
    },
  },
}
</script>