<template>
  <div>
    <div class="d-flex">
      <v-icon
        v-if="!isActive"
        class="mr-4"
        :class="{ active: isActive }"
        @click="isActive = !isActive"
        >> mdi-plus-circle-outline
      </v-icon>
      <v-icon
        v-else
        class="mr-4"
        :class="{ active: isActive }"
        @click="isActive = !isActive"
      >
        mdi-minus-circle-outline
      </v-icon>
      <p class="ma-0">Ajouter une adresse</p>
    </div>
    <div v-if="isActive">
      <v-form v-model="isNewFormAddressValid">
        <v-row class="mt-2">
          <v-col cols="12" class="pa-1">
            <v-text-field
              v-model="newAddress.name"
              :rules="[
                (v) => !!v || 'Veuillez entrer le libellé de l\'address',
              ]"
              label="Libellé *"
              outlined
            />
          </v-col>
          <v-col cols="12" class="pa-1">
            <v-text-field
              v-model="newAddress.address"
              :rules="[(v) => !!v || 'Veuillez entrer votre adresse']"
              label="Adresse *"
              outlined
            />
          </v-col>

          <v-col cols="6" class="pa-1">
            <v-text-field
              v-model="newAddress.city"
              :rules="[(v) => !!v || 'Veuillez entrer votre ville']"
              label="Ville *"
              outlined
            />
          </v-col>
          <v-col cols="6" class="pa-1">
            <v-text-field
              v-model="newAddress.postalCode"
              :rules="[(v) => !!v || 'Veuillez entrer votre code postal']"
              label="Code postal *"
              outlined
            />
          </v-col>
          <v-col cols="12" class="pa-1">
            <v-text-field
              v-model="newAddress.country"
              :rules="[(v) => !!v || 'Veuillez entrer votre pays']"
              label="Pays *"
              outlined
            />
          </v-col>
        </v-row>
      </v-form>
      <v-row class="justify-space-around">
        <v-btn
          :disabled="!isNewFormAddressValid"
          outlined
          class="mb-5"
          @click="addAddress()"
        >
          Enregistrer</v-btn
        >
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
      isNewFormAddressValid: false,
      newAddress: {
        name: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
      },
    }
  },
  methods: {
    async getProfil() {
      await this.$store.dispatch('user/setProfil')
    },
    async addAddress() {
      await this.$store.dispatch('user/addAddress', {
        user: `api/users/${this.$store.state.user.profil.id}`,
        address: this.newAddress,
      })
      this.getProfil()
      this.newAddress = {}
      this.isActive = false
    },
  },
}
</script>