<template>
  <v-textarea
    v-model="field"
    outlined
    name="input-7-4"
    :label="$props.label"
  ></v-textarea>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
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