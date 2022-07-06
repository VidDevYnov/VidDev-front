<template>
  <div>
    <v-form v-model="isFormValid">
      <v-card class="pa-5">
        <v-row>
          <v-col cols="12" md="8">
            <v-row>
              <v-col cols="12">
                <TextField
                  :get="$props.article.name"
                  :rules="[(v) => !!v || 'Veuillez entrer un nom']"
                  label="Nom *"
                  :fieldName="['articles', 'article', 'name']"
                />
              </v-col>
              <v-col cols="6">
                <Select
                  :items="setFilter($store.state.articles.categories)"
                  :get="$props.article.articleCategory || {}"
                  :rules="[(v) => !!v || 'La categorie est obligatoire']"
                  label="Catégorie *"
                  :fieldName="['articles', 'article', 'articleCategory']"
                />
                <Select
                  :items="setFilter($store.state.articles.states)"
                  :get="$props.article.articleState || {}"
                  :rules="[(v) => !!v || 'L\'état est obligatoire']"
                  label="Etat *"
                  :fieldName="['articles', 'article', 'articleState']"
                />

                <TextField
                  :get="$props.article.color"
                  label="Couleur"
                  :fieldName="['articles', 'article', 'color']"
                />

                <Select
                  :items="setFilter($store.state.articles.types)"
                  :get="$props.article.articleType || {}"
                  :rules="[(v) => !!v || 'Le type est obligatoire']"
                  label="Type *"
                  :fieldName="['articles', 'article', 'articleType']"
                />
              </v-col>
              <v-col cols="6">
                <TextField
                  :get="$props.article.brand"
                  :rules="[(value) => !!value || 'La marque est obligatoire']"
                  label="Marque *"
                  :fieldName="['articles', 'article', 'brand']"
                />
                <Select
                  :items="setFilter($store.state.articles.sizes)"
                  :get="$props.article.articleSize || {}"
                  :rules="[(v) => !!v || 'La taille est obligatoire']"
                  label="Taille"
                  :fieldName="['articles', 'article', 'articleSize']"
                />

                <Select
                  :items="setFilter($store.state.articles.materials)"
                  :get="$props.article.articleMaterial || {}"
                  :rules="[(v) => !!v || 'La matière est obligatoire']"
                  label="Matière"
                  :fieldName="['articles', 'article', 'articleMaterial']"
                />

                <TextField
                  :get="$props.article.price"
                  :rules="[
                    (v) => !!v || 'Le prix est obligatoire',
                    (v) => !isNaN(Number(v)) || 'Le prix doit etre un nombre',
                  ]"
                  :fieldName="['articles', 'article', 'price']"
                  label="Prix"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="4">
            <TextArea
              :get="$props.article.description"
              label="Description"
              :fieldName="['articles', 'article', 'description']"
            />
          </v-col>
        </v-row>
        <v-row class="ma-2 justify-center">
          <v-btn outlined :disabled="!isFormValid" @click="modifyArticle">
            Enregistrer</v-btn
          >
        </v-row>
      </v-card>
    </v-form>
    <v-form v-model="iqFormImageValid">
      <v-row class="mt-5">
        <v-col cols="12" md="4">
          <v-card class="pa-5">
            <v-row class="ma-2 justify-center">
              <v-img
                max-height="250"
                max-width="200"
                :src="
                  `${path}/images/articles/${$props.article.imageFilePath}` ||
                  '../image/avatar.png'
                "
              ></v-img>
            </v-row>

            <v-file-input
              v-model="image"
              label="Choisir une image"
              hide-details
              class="d-flex align-center my-4"
              accept="image/png, image/jpeg, image/bmp"
              prepend-icon="mdi-camera"
              outlined
              dense
              :rules="[
                (value) =>
                  !value || value.size < 2000000 || 'L\'image est obligatoire',
              ]"
            ></v-file-input>
            <v-row class="ma-2 justify-center">
              <v-btn
                outlined
                :disabled="!iqFormImageValid"
                @click="updateArticleImage"
              >
                Modifier image</v-btn
              >
            </v-row>
          </v-card>
        </v-col>
        <v-col class="d-flex align-center">
          <v-row class="ma-2 justify-center">
            <v-btn outlined color="red lighten-1" @click="deleteArticle">
              Supprimer l'article</v-btn
            >
          </v-row>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true,
      default: () => {},
    },
  },

  data() {
    return {
      isFormValid: false,
      iqFormImageValid: false,
      image: [],
    }
  },
  computed: {
    setFilter() {
      return (stateFiltre) => {
        if (stateFiltre.length > 0) {
          const tabFilter = []
          stateFiltre.map(function (value, key) {
            return tabFilter.push({
              text: stateFiltre[key].worded,
              value: stateFiltre[key].id,
            })
          })
          return tabFilter
        }
        return []
      }
    },

    path() {
      return process.env.NUXT_ENV_PATH
    },
  },
  created() {
    this.getFilter()
  },
  methods: {
    async getFilter() {
      await this.$store.dispatch('articles/getArticlesFilter')
    },
    async modifyArticle() {
      await this.$store.dispatch('articles/modifyArticle', {
        article: this.$props.article,
      })
    },

    async updateArticleImage() {
      const formData = new FormData()
      formData.append('file', this.image)
      await this.$store.dispatch('articles/createArticleImage', {
        formData,
        idArticle: this.$props.article.id,
      })

      this.getArticle()
    },

    async getArticle() {
      await this.$store.dispatch('articles/setArticle', {
        idArticle: this.$route.params.id,
      })
    },

    async deleteArticle() {
      await this.$store.dispatch('articles/deleteArticle', {
        idArticle: this.$props.article.id,
      })
      this.$router.push('/user/profil')
    },
  },
}
</script>

