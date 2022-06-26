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
            <v-list-item>
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
                <div v-if="!isActive" class="my-4">
                  Ajouter une remise grace à vos points
                  <v-icon
                    class="mr-4"
                    :class="{ active: isActive }"
                    @click="isActive = !isActive"
                    >mdi-plus-circle-outline
                  </v-icon>
                </div>
                <div v-else class="my-4">
                  Ne pas mettre de remise
                  <v-icon
                    class="mr-4"
                    :class="{ active: isActive }"
                    @click="isActive = !isActive"
                  >
                    mdi-minus-circle-outline
                  </v-icon>
                </div>

                <v-text-field
                  v-if="isActive"
                  v-model="remise"
                  :rules="[
                    (v) => !!v || 'Veuillez entrer une remise',
                    (v) => !isNaN(Number(v)) || 'La remise doit être un nombre',
                    (v) => v <= 50 || 'La remise ne peut dépasser 50%',
                    (v) =>
                      v <= $props.profil.point ||
                      'Vous  n\'avez pas assez de point',
                  ]"
                  label="Remise en %"
                  outlined
                  class="my-5"
                  >%</v-text-field
                >
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
  setRemise,
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
      remise: 0,
      isActive: false,
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
      const total = displayPrice(this.$props.article.price) || '0'
      if (this.remise !== 0) {
        return setRemise(
          tryConvertStringToNumber(total),
          tryConvertStringToNumber(this.remise)
        )
      }
      return total
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
      if (this.Totalprice < this.$store.state.user.profil.solde) {
        await this.$store.dispatch('order/orderArticle', {
          user: this.$props.profil,
          order: {
            price: tryConvertStringToNumber(this.Totalprice),
            commission: tryConvertStringToNumber(this.Commition),
            point: tryConvertStringToNumber(this.Point),
            address: `/api/addresses/${this.address.id}`,
            user: `/api/users/${this.$props.profil.id}`,
          },
          article: this.$props.article,
          remise: tryConvertStringToNumber(this.remise),
        })
        this.$router.push('/')
      } else {
        this.$store.commit('notification/create', {
          description:
            "Vous n'avez pas assez dans votre solde veillez créditer votre compte",
          type: 'error',
        })
      }
    },
  },
}
</script>
