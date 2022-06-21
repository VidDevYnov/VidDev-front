<template>
  <v-form v-model="isFormValid">
    <v-row>
      <v-col cols="12" md="8">
        <v-card class="d-flex flex-wrap">
          <v-col cols="12">
            <v-text-field
              v-model="article.name"
              :rules="[(value) => !!value || 'Le nom est obligatoire']"
              label="Nom"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="article.articleCategory"
              :items="
                setFilter(
                  $store.state.articles.categories,
                  'article_categories'
                )
              "
              label="Catégorie"
              :rules="[(v) => !!v || 'La categorie est obligatoire']"
              outlined
            ></v-select>
            <v-select
              v-model="article.articleState"
              :items="setFilter($store.state.articles.states, 'article_states')"
              label="Etat"
              :rules="[(v) => !!v || 'L\'état est obligatoire']"
              outlined
            ></v-select>
            <v-text-field
              v-model="article.color"
              label="Couleur"
              outlined
            ></v-text-field>
            <v-select
              v-model="article.articleType"
              :rules="[(v) => !!v || 'Le type est obligatoire']"
              :items="setFilter($store.state.articles.types, 'article_types')"
              label="Type"
              outlined
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="article.brand"
              :rules="[(value) => !!value || 'La marque est obligatoire']"
              label="Marque"
              outlined
            ></v-text-field>
            <v-select
              v-model="article.articleSize"
              :items="setFilter($store.state.articles.sizes, 'article_sizes')"
              label="Taille"
              outlined
              :rules="[(v) => !!v || 'La taille est obligatoire']"
            ></v-select>
            <v-select
              v-model="article.articleMaterial"
              :items="
                setFilter($store.state.articles.materials, 'article_materials')
              "
              label="Matière"
              outlined
              :rules="[(v) => !!v || 'La matière est obligatoire']"
            ></v-select>
            <v-text-field
              v-model="article.price"
              label="Prix"
              :rules="[
                (v) => !!v || 'Le prix est obligatoire',
                (v) => !isNaN(Number(v)) || 'Le prix doit etre un nombre',
              ]"
              outlined
            ></v-text-field>
          </v-col>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="pa-3">
          <v-textarea
            v-model="article.description"
            label="Description"
            outlined
            rows="15"
            hide-details
            class="mb-6"
          ></v-textarea>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-file-input
          v-model="article.image"
          label="Choisir une image"
          hide-details
          class="d-flex align-center my-4"
          accept="image/png, image/jpeg, image/bmp"
          prepend-icon="mdi-camera"
          outlined
          dense
        ></v-file-input>
      </v-col>
    </v-row>

    <v-row class="justify-center">
      <v-btn outlined :disabled="!isFormValid" @click="createArticle">
        Enregistrer</v-btn
      >
    </v-row>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      isFormValid: false,
      article: {
        name: '',
        brand: '',
        articleSize: '',
        description: '',
        price: '',
        articleState: '',
        color: '',
        articleType: '',
        articleMaterial: '',
        articleCategory: '',
        image: [],
      },
    }
  },
  computed: {
    setFilter() {
      return (stateFiltre, nameId) => {
        if (stateFiltre.length > 0) {
          const tabFilter = []
          stateFiltre.map(function (value, key) {
            return tabFilter.push({
              text: stateFiltre[key].worded,
              value: `api/${nameId}/${stateFiltre[key].id}`,
            })
          })

          return tabFilter
        }
        return []
      }
    },
  },
  created() {
    this.getFilter()
  },
  methods: {
    async getFilter() {
      await this.$store.dispatch('articles/getArticlesFilter')
    },
    async createArticle() {
      const formData = new FormData()
      formData.append('file', this.article.image)
      await this.$store.dispatch('articles/createArticle', {
        article: this.article,
        idUser: this.$store.state.user.profil.id,
        formData,
      })
    },
  },
}
</script>

