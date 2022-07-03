<template>
  <v-card>
    <v-card-title>Listes des {{ $props.title }}</v-card-title>
    <FilterAdd :name="$props.name" :title="`Ajout de ${$props.title}`" />
    <v-list>
      <v-list-group v-for="(filter, index) in filters" :key="index">
        <template #activator>
          <v-list-item-content>
            <v-list-item-title>{{ filter.worded }}</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-form v-model="isFormValid">
          <v-row class="mt-2 pa-4">
            <v-col cols="12" class="pa-1">
              <TextField
                :get="filter.worded"
                :rules="[(value) => !!value || 'Le nom est obligatoire']"
                label="Libellé *"
                :fieldName="['filter', $props.name, 'worded', index]"
                :isObject="true"
              />
            </v-col>
          </v-row>
        </v-form>
        <v-row class="justify-space-around">
          <v-btn
            :disabled="!isFormValid"
            outlined
            class="mb-5"
            @click="modifyFilter(filter)"
          >
            Enregistrer</v-btn
          >

          <v-btn
            outlined
            class="mb-5"
            color="red lighten-1"
            @click="deleteFilter(filter)"
          >
            Supprimer</v-btn
          >
        </v-row>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    state: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isFormValid: false,
    }
  },
  computed: {
    filters() {
      return this.$props.state
    },
  },
  created() {
    this.getFilters()
  },
  methods: {
    async getFilters() {
      await this.$store.dispatch('filter/setFilter', this.$props.name)
    },

    async modifyFilter(filter) {
      filter.name = this.$props.name
      await this.$store.dispatch('filter/modifyFilter', {
        filter,
      })
    },

    async deleteFilter(filter) {
      await this.$store.dispatch('filter/deleteFilter', {
        filter: {
          name: this.$props.name,
          id: filter.id,
        },
      })
      this.getFilters()
    },
  },
}
</script>