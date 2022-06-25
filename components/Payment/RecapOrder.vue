<template>
  <div>
    <v-card class="mx-auto ma-5" max-width="344" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-overline mb-4">Commande</div>
          <v-list-item-title class="text-h5 mb-1">
            <p>{{ $props.article.name }}</p>
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ getWorded($props.article.articleSize) }} /
            {{ getWorded($props.article.articleState) }}
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar tile size="80">
          <v-img
            :src="`http://localhost:8000/images/articles/${$props.article.imageFilePath}`"
          ></v-img
        ></v-list-item-avatar>
      </v-list-item>
    </v-card>

    <v-card class="mx-auto ma-5" max-width="344" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-overline mb-4">Adresse</div>
          <v-list-item-title class="text-h5 mb-1">
         
          </v-list-item-title>
          <v-list-item-subtitle
            >dkfsl</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
    </v-card>

    <v-card class="mx-auto ma-5" max-width="344" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-overline mb-4">Option de livraison</div>
          <v-radio-group v-model="radios">
            <v-radio value="Google">
              <template v-slot:label>
                <div>Envoi au point relais</div>
              </template>
            </v-radio>
            <v-radio value="Duckduckgo">
              <template v-slot:label>
                <div>Envoi à domicile</div>
              </template>
            </v-radio>
          </v-radio-group>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },

  computed: {
    getWorded() {
      return (type) => {
        if (typeof type !== 'undefined') {
          return type.worded
        }
        return type
      }
    },
  },
}
</script>
