<template>
  <div class="ma-5">
    <Title name="Gestion des filtres"></Title>
    <p class="text-center red--text text--lighten-1">
      Attention, vous ne pourrez pas supprimer des filtres liées à des articles
    </p>
    <v-row>
      <v-col cols="12" sm="6">
        <FilterModify
          name="article_categories"
          :state="$store.state.filter.article_categories"
          title="catégories"
        />
      </v-col>

      <v-col cols="12" sm="6">
        <FilterModify
          name="article_types"
          :state="$store.state.filter.article_types"
          title="types"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <FilterModify
          name="article_materials"
          :state="$store.state.filter.article_materials"
          title="matières"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <FilterModify
          name="article_states"
          :state="$store.state.filter.article_states"
          title="états"
        />
      </v-col>
      <v-col cols="12">
        <FilterModify
          name="article_sizes"
          :state="$store.state.filter.article_sizes"
          title="tailles"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {}
</script>