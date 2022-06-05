<script>
export default {
  created() {
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('token')
    this.$router.push('/')
  },
}
</script>