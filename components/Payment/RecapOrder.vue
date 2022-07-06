<template>
  <v-form v-model="isFormValid">
    <v-row class="ma-0">
      <v-col cols="12" md="8" class="ma-0 pa-0">
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
                  :src="`${path}/images/articles/${$props.article.imageFilePath}`"
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
                    v-if="addresses.length > 0"
                    v-model="address"
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
      <v-col cols="12" md="4" class="ma-0 pa-0">
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
                <div
                  v-if="!isActive"
                  class="my-4"
                  @click="isActive = !isActive"
                >
                  Ajouter une remise grâce à vos points
                  <v-icon style="font-size: 20px mx-2"
                    >mdi-heart-multiple</v-icon
                  >

                  <v-icon class="mr-4" :class="{ active: isActive }"
                    >mdi-plus-circle-outline
                  </v-icon>
                </div>
                <div v-else class="my-4" @click="isActive = !isActive">
                  Ne pas mettre de remise
                  <v-icon class="mr-4" :class="{ active: isActive }">
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
            <v-row v-if="canBuy" class="justify-center ma-2">
              <v-btn
                outlined
                width="220"
                :disabled="!isFormValid || addresses.length === 0"
                @click="setOrder"
              >
                Payer maintenant</v-btn
              >
            </v-row>
            <v-row v-else class="justify-center ma-2">
              <p>Vous ne pouvez pas acheter votre propre article</p>
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

    path() {
      return process.env.NUXT_ENV_PATH
    },
    canBuy() {
      const hasData = this.$props.article.user && this.$props.profil
      return hasData
        ? this.$props.article.user.id !== this.$props.profil.id
        : false
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
        this.sendMailSeller()
        this.createNotificationSeller()
        this.$router.push('/')
      } else {
        this.$store.commit('notification/create', {
          description:
            "Vous n'avez pas assez dans votre solde veillez créditer votre compte",
          type: 'error',
        })
      }
    },

    async sendMailSeller() {
      await this.$store.dispatch('order/sendMailSeller', {
        user: this.$props.article.user,
        article: this.$props.article,
        buyeur: {
          firstName: this.$props.profil.firstName,
          lastName: this.$props.profil.lastName,
          addresse: `${this.address.address} ${this.address.city} ${this.address.postalCode} ${this.address.country}`,
        },
      })
    },

    async createNotificationSeller() {
      await this.$store.dispatch('userNotification/createNotification', {
        notification: {
          user: `api/users/${this.$props.article.user.id}`,
          isView: false,
          title: `Vous avez vendu un article`,
          description: `Bonjour,
                        <br>
                        L'utilisateur ${this.$props.profil.firstName}  ${this.$props.profil.lastName} vient de commander votre article :
                        <br>
                        ${this.$props.article.name}
                        <br>
                        Veillez le livrer a l'adresse suivante : 
                        <br>
                        ${this.address.address} ${this.address.city} ${this.address.postalCode} ${this.address.country}
                        `,
        },
      })
    },
  },
}
</script>
