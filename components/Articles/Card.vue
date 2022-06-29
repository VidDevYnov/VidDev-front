
<template>
  <div>
    <v-card class="ma-5 pa-1" color="light" light>
      <v-card-actions>
        <NuxtLink
          :to="`/member/${$props.user.id}`"
          class="text-decoration-none"
        >
          <v-list-item class="grow">
            <v-list-item-avatar color="grey darken-3">
              <v-img
                class="elevation-6"
                alt=""
                :src="`process.env.path/images/users/${$props.user.imageFilePath}`"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ $props.user.firstName }}
                {{ $props.user.lastName }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </NuxtLink>
      </v-card-actions>
      <NuxtLink
        :to="`/articles/${$props.article.id}`"
        class="text-decoration-none d-flex justify-center"
      >
        <v-img
          height="200"
          width="250"
          :src="`${path}/images/articles/${$props.article.imageFilePath}`"
        ></v-img>
      </NuxtLink>

      <div class="ma-2">Prix: {{ price }}€</div>

      <div class="ma-2">Taille: {{ $props.article.articleSize.worded }}</div>

      <div class="ma-2">Marque: {{ $props.article.brand }}</div>
    </v-card>
  </div>
</template>

<script>
import { displayPrice } from '../../services/priceHelper'

export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },

  computed: {
    price() {
      return displayPrice(this.$props.article.price)
    },
    path(){
      return process.env.path
    }
  },
}
</script>
