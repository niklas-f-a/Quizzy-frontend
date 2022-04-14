<template>
<main>
  <Header/>
</main>
</template>

<script>
import Header from '@/components/Header'
export default {
  components: {Header},
  async mounted(){
    await this.$store.dispatch('getMe')
  }

}
</script>

<style lang="scss" scoped>

</style>