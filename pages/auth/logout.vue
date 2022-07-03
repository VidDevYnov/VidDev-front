<template>
  <Title name="Deconnexion ..."></Title>
</template>

<script>
export default {
  created() {
    this.$cookiz.removeAll()
    this.$router.push('/')
  },
}
</script>