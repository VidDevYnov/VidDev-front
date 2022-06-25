<template>
  <v-form v-model="isFormValid">
    <v-row>
      <v-col cols="8">
        <div class="ma-5">
          <v-card class="mx-auto ma-5" outlined>
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

          <v-card class="mx-auto ma-5" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-2">Adresse</div>
                <v-list-item-title class="text-h5 mb-1"> </v-list-item-title>
                <v-list-item-subtitle>
                  <v-radio-group
                    v-model="address"
                    v-if="addresses.length > 0"
                    :rules="[(v) => !!v || 'L\'adresse est obligatoire']"
                  >
                    <v-radio
                      v-for="address in addresses"
                      :key="address.id"
                      :label="`${address.address} ${address.city} ${address.postalCode} ${address.country}`"
                      :value="address"
                      class="ma-4"
                    ></v-radio>
                  </v-radio-group>
                  <v-row v-else class="pa-3">
                    <p class="ma-0 d-flex align-center">
                      Vous n'avez pas d'addresse veillez en ajouter une
                    </p>

                    <NuxtLink to="/user/modify" class="text-decoration-none">
                      <v-btn class="ma-2" outlined>
                        <v-icon class="mr-2">mdi-pencil</v-icon>
                      </v-btn>
                    </NuxtLink>
                  </v-row>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </div>
      </v-col>
      <v-col cols="4">
        <div class="ma-5">
          <v-card class="mx-auto ma-5 pa-2">
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4">Resumé de la Commande</div>

                <v-list-item-subtitle
                  >Commande: {{ $props.article.price }} €</v-list-item-subtitle
                >
                <v-list-item-subtitle
                  >Commission: {{ Commition }} €
                </v-list-item-subtitle>
                <v-list-item-subtitle
                  >Point à gagner: {{ Point }}
                </v-list-item-subtitle>
                <div class="text-overline mb-4">Total {{ Totalprice }} €</div>
              </v-list-item-content>
            </v-list-item>
            <v-row class="justify-center ma-2">
              <v-btn
                outlined
                width="220"
                :disabled="!isFormValid || addresses.length === 0"
                @click="setOrder"
              >
                Payer maintenant</v-btn
              >
            </v-row>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import {
  displayPrice,
  setPoint,
  setCommition,
} from '../../services/priceHelper'
import { tryConvertStringToNumber } from '../../services/numberHelper'

export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
    profil: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      address: '',
      isFormValid: false,
    }
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
    addresses() {
      if (this.profil.addresses) {
        return this.profil.addresses
      }
      return {}
    },
    Totalprice() {
      return displayPrice(this.$props.article.price) || '0'
    },
    Point() {
      return setPoint(this.$props.article.price) || '0'
    },
    Commition() {
      return setCommition(this.$props.article.price) || '0'
    },
  },

  methods: {
    async setOrder() {
      await this.$store.dispatch('order/orderArticle', {
        user: this.$props.profil,
        order: {
          price: tryConvertStringToNumber(this.$props.article.price),
          commission: tryConvertStringToNumber(this.Commition),
          point: tryConvertStringToNumber(this.Point),
          address: `/api/addresses/${this.address.id}`,
          user: `/api/users/${this.$props.profil.id}`,
        },
        article: this.$props.article,
      })
      // this.$router.push('/')
    },
  },
}
</script>
