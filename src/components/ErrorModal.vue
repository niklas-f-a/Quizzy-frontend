<template>
  <div v-if="error" class="error-modal"> 
    <p>{{error}}</p>
    <button @click="$store.dispatch('removeErrorMessage')" class="error">OK</button>
  </div>
</template>

<script>
export default {
  computed: {
    error(){
      return this.$store.state.errorMessage
    }
  }
}
</script>

<style lang="scss" scoped>
.error-modal{
  position: absolute;
  top: 10rem;
  right: 100%;
  left: 50%;
  width: 15rem;
  padding: 1rem;
  background-color: #ffffff;
  color: red;
  border: 1px solid red;
  border-radius: 4px;
  display: grid;
  place-items: center;
  z-index: 5;
  p{
    margin: 0;
    text-align: center;
  }
}
</style>