<template>
  <v-card class="pa-5 ma-5">
    <v-form v-model="isFormValid">
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="Amount"
            :rules="[
              (v) => !!v || 'La montant est obligatoire',
              (v) => !isNaN(Number(v)) || 'Le prix doit etre un nombre',
              (v) => v >= 0 || 'Le solde ne peut pas être négatif',
            ]"
            label="Montant"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            :rules="[(v) => !!v || 'La nom est obligatoire']"
            label="Nom figurant sur la carte"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="CardNumber"
            :counter="16"
            :rules="[
              (v) => !!v || 'Le numéro est obligatoire',
              (v) =>
                !isNaN(Number(v)) || 'Le numéro doit etre une suite de chiffre',
              (v) => v.length == 16 || 'Le numéro doit faire 16 caractère',
            ]"
            label="Numéro de carte"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <v-select :items="MonthList" label="Mois" outlined hide-details />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-select :items="YearList" label="Année" outlined hide-details />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            v-model="cvv"
            single-line
            outlined
            :counter="3"
            :rules="[
              (v) => !!v || 'Le CVV est obligatoire',
              (v) =>
                !isNaN(Number(v)) || 'Le CVV doit etre une suite de chiffre',
              (v) => v.length == 3 || 'Le CVV doit faire 3 caractère',
            ]"
            label="CVV"
          />
        </v-col>
      </v-row>
    </v-form>

    <v-row class="justify-center ma-5">
      <v-btn :disabled="!isFormValid" outlined @click="setSolde">
        Enregistrer</v-btn
      >
    </v-row>
  </v-card>
</template>
<script>
import { tryConvertStringToNumber } from '../../services/numberHelper'

export default {
  props: {
    type: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      cvv: '',
      CardNumber: '',
      isFormValid: false,
      Amount: 0,
      YearList: ['22', '23', '24', '25', '26'],
      MonthList: [
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12',
      ],
    }
  },

  methods: {
    async setSolde() {
      let newSolde =
        this.$store.state.user.profil.solde +
        tryConvertStringToNumber(this.Amount)
      if (this.$props.type !== 'credit') {
        newSolde =
          this.$store.state.user.profil.solde -
          tryConvertStringToNumber(this.Amount)
      }

      if (newSolde >= 0) {
        await this.$store.dispatch('user/modifyProfil', {
          user: {
            solde: newSolde,
          },
          idUser: this.$store.state.user.profil.id,
        })
        this.$router.push('/user/profil')
      } else {
        this.$store.commit('notification/create', {
          description: 'Votre solde ne peut pas être inférieur à 0',
          type: 'error',
        })
      }
    },
  },
}
</script>