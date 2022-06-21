<template>
  <div>
    <Title name="Ajout d'un article" />
    <div class="ma-5">
      <EditArticlesFormNew />
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getProfil()
  },

  methods: {
    async getProfil() {
      await this.$store.dispatch('user/setProfil')
    },
  },
}
</script>