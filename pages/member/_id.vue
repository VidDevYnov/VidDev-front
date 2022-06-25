<template>
  <div class="d-flex flex-column justify-center">
    <MemberInfo :member="member" />
    <SubTitle name="Vide dressing" />
    <MemberDressing :member="member" />
  </div>
</template>



<script>
export default {
  computed: {
    member() {
      const member = this.$store.state.member.member
      if (member.length !== 0) {
        if (member.addresses.length > 0) {
          member.address =
            member.addresses[0].city + ', ' + member.addresses[0].country
        }
        return member
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
    },
  },
}
</script>