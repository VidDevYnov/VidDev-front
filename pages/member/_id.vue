<template>
  <div class="d-flex flex-column justify-center">
    <MemberInfo :member="member" />
    <SubTitle name="Vide dressing" />
    <MemberDressing :articles="articles" />
  </div>
</template>



<script>
export default {
  computed: {
    member() {
      const member = this.$store.state.member.member
      if (member?.addresses?.length > 0) {
        member.address = `${member.addresses[0].city}, ${member.addresses[0].country}`
      }
      return member.length === 0 ? {} : member
    },
    articles() {
      const articles = this.$store.state.articles.userArticles
      if (articles.length !== 0) {
        return articles
      }
      return {}
    },
  },
  created() {
    this.getMember()
  },
  methods: {
    async getMember() {
      await this.$store.dispatch('member/setMember', this.$route.params.id)
      await this.$store.dispatch(
        'articles/setUserArticles',
        this.$route.params.id
      )
    },
  },
}
</script>