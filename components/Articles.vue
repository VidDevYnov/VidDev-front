
<template>
  <v-card class="ma-5" max-width="250" color="light" light>
    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            alt=""
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ article.user.firstName }} {{ article.user.lastName }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card-actions>

    <v-img
      height="200"
      width="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title>Cafe Badilico</v-card-title>

    <v-card-text>
      <div class="my-4 text-subtitle-1">Italian, Cafe</div>

      <div>
        Small plates, salads sandwiches - an intimate setting with 12 indoor
        seats plus patio seating.
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
}
</script>
