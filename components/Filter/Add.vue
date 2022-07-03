<template>
  <div class="pa-4">
    <div class="d-flex">
      <v-icon
        v-if="!isActive"
        class="mr-4"
        :class="{ active: isActive }"
        @click="isActive = !isActive"
        >> mdi-plus-circle-outline
      </v-icon>
      <v-icon
        v-else
        class="mr-4"
        :class="{ active: isActive }"
        @click="isActive = !isActive"
      >
        mdi-minus-circle-outline
      </v-icon>
      <p class="ma-0">{{ $props.title }}</p>
    </div>
    <div v-if="isActive">
      <v-form v-model="isNewFormValid">
        <v-row class="mt-2">
          <v-col cols="12" class="pa-1">
            <v-text-field
              v-model="newFilter"
              :rules="[(v) => !!v || 'Veuillez entrer le libellé']"
              label="Libellé *"
              outlined
            />
          </v-col>
        </v-row>
      </v-form>
      <v-row class="justify-space-around">
        <v-btn
          :disabled="!isNewFormValid"
          outlined
          class="mb-5"
          @click="createFilter()"
        >
          Enregistrer</v-btn
        >
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isActive: false,
      isNewFormValid: false,
      newFilter: '',
    }
  },
  methods: {
    async getFilters() {
      await this.$store.dispatch('filter/setFilter', this.$props.name)
    },

    async createFilter() {
      await this.$store.dispatch('filter/createFilter', {
        filter: {
          name: this.$props.name,
          worded: this.newFilter,
        },
      })
      this.getFilters()
      this.newFilter = ''
      this.isActive = false
    },
  },
}
</script>