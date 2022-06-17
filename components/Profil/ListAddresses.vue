<template>
  <v-list>
    <v-list-group
      v-for="(address, index) in $props.profil.addresses"
      :key="index"
    >
      <template #activator>
        <v-list-item-content>
          <v-list-item-title>{{ address.name }}</v-list-item-title>
        </v-list-item-content>
      </template>
      <v-form v-model="isFormAddressValid">
        <v-row class="mt-2">
          <v-col cols="12" class="pa-1">
            <AddressTextField
              :get="address.name"
              :rules="[
                (v) => !!v || 'Veuillez entrer le libellé de l\'address',
              ]"
              label="Libellé *"
              fieldName="name"
              :idAddress="index"
            />
          </v-col>
          <v-col cols="12" class="pa-1">
            <AddressTextField
              :get="address.address"
              :rules="[(v) => !!v || 'Veuillez entrer votre adresse']"
              label="Adresse *"
              fieldName="address"
              :idAddress="index"
            />
          </v-col>

          <v-col cols="6" class="pa-1">
            <AddressTextField
              :get="address.city"
              :rules="[(v) => !!v || 'Veuillez entrer votre ville']"
              label="Ville *"
              fieldName="city"
              :idAddress="index"
            />
          </v-col>
          <v-col cols="6" class="pa-1">
            <AddressTextField
              :get="address.postalCode"
              :rules="[(v) => !!v || 'Veuillez entrer votre code postal']"
              label="Code postal *"
              fieldName="postalCode"
              :idAddress="index"
            />
          </v-col>
          <v-col cols="12" class="pa-1">
            <AddressTextField
              :get="address.country"
              :rules="[(v) => !!v || 'Veuillez entrer votre pays']"
              label="Pays *"
              fieldName="country"
              :idAddress="index"
            />
          </v-col>
        </v-row>
      </v-form>
      <v-row class="justify-space-around">
        <v-btn
          :disabled="!isFormAddressValid"
          outlined
          class="mb-5"
          @click="modifyAddress(index)"
        >
          Enregistrer</v-btn
        >

        <v-btn
          outlined
          class="mb-5"
          color="red lighten-1"
          @click="deleteAddress(index)"
        >
          Supprimer</v-btn
        >
      </v-row>
    </v-list-group>
  </v-list>
</template>

<script>
export default {
  props: {
    profil: {
      type: Object,
      required: true,
      default: () => {},
    },
  },

  data() {
    return {
      isFormAddressValid: false,
    }
  },

  methods: {
    async getProfil() {
      await this.$store.dispatch('user/setProfil')
    },
    async modifyAddress(idAddress) {
      await this.$store.dispatch('user/modifyAddress', {
        address: {
          name: this.profil.addresses[idAddress].name,
          address: this.profil.addresses[idAddress].address,
          postalCode: this.profil.addresses[idAddress].postalCode,
          city: this.profil.addresses[idAddress].city,
          country: this.profil.addresses[idAddress].country,
        },
        idAddress: this.profil.addresses[idAddress].id,
      })
    },

    async deleteAddress(idAddress) {
      await this.$store.dispatch('user/deleteAddress', {
        idAddress: this.profil.addresses[idAddress].id,
      })
      this.getProfil()
    },
  },
}
</script>