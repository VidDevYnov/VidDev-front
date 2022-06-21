<template>
  <v-select
    v-model="field"
    :items="$props.items"
    :label="$props.label"
    outlined
    :rules="$props.rules"
  ></v-select>
</template>

<script>
export default {
  props: {
    get: {
      type: Object,
      required: true,
      default: () => {},
    },
    fieldName: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      required: false,
      default: () => '',
    },
  },
  computed: {
    field: {
      get() {
        if (this.$props.get) {
          return { text: this.$props.get.worded, value: this.$props.get.id }
        }
        return ''
      },
      set(value) {
        this.$store.commit(`${this.$props.fieldName[0]}/setObjectId`, {
          stateName: this.$props.fieldName[1],
          fieldName: this.$props.fieldName[2],
          id: 'id',
          value,
        })
      },
    },
  },
}
</script>