<template>
  <div v-if="error || modal" class="fade-layer"></div>
</template>

<script>
export default {
  props: ['modal'],
  computed: {
    error(){
      return this.$store.state.errorMessage
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-layer{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000000;
  opacity: .3;
  z-index: 3;
}
</style>