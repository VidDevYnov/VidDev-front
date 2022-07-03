<template>
  <v-text-field
    v-model="field"
    :label="$props.label"
    outlined
    :rules="$props.rules"
  ></v-text-field>
</template>

<script>
import { tryConvertStringToNumber } from '../services/numberHelper'

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
      required: true,
    },
    fieldName: {
      type: Array,
      required: true,
    },
    number: {
      type: Boolean,
      required: false,
    },
    isObject: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    field: {
      get() {
        return this.$props.get
      },
      set(value) {
        if (this.$props.number) value = tryConvertStringToNumber(value)

        if (this.$props.isObject) {
          this.$store.commit(`${this.$props.fieldName[0]}/setObjectId`, {
            stateName: this.$props.fieldName[1],
            fieldName: this.$props.fieldName[2],
            id: this.$props.fieldName[3],
            value,
          })
        } else {
          this.$store.commit(this.$props.fieldName[0] + '/setValue', {
            stateName: this.$props.fieldName[1],
            fieldName: this.$props.fieldName[2],
            value,
          })
        }
      },
    },
  },
}
</script>