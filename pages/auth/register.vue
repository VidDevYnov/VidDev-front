<template>
  <div>
    <h2 class="text-center ma-5">Inscription</h2>
    <v-row class="justify-center ma-5">
      <v-col cols="12" offset-xs="12" sm="12" md="6" lg="4"
        ><v-text-field label="Nom" outlined> </v-text-field>
        <v-text-field label="Prénom" outlined></v-text-field>
        <v-text-field label="Email" outlined></v-text-field>
        <v-text-field label="Mot de passe" outlined></v-text-field>
        <v-text-field
          label="Confirmation du mot de passe"
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="justify-center ma-5">
      <v-btn color="#417D7A" dark> Inscription </v-btn>
    </v-row>
  </div>
</template>