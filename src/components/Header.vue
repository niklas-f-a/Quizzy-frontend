<template>
  <header :class="{green: cat == 'nature', blue: cat == 'music',
    red: cat == 'movie', yellow: cat == 'mix'}">
    <h1 @click="$router.push('/categories')">QUIZZY</h1>
    <nav>
      <router-link to="/categories">Quizzes</router-link>
      <router-link to="/profile">create/update</router-link>
      <a @click="logOut">Log Out</a>
    </nav>
  </header>
</template>

<script>
export default {
  props: {
    cat: String
  },
  methods: {
    logOut(){
      this.$store.dispatch('logOut')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/fonts-colours.scss';
header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
  height: 5rem;
  background-color: $primary;
  h1{
    font-size: 3rem;
    margin-left: 5rem;
    &:hover{
      cursor: pointer;
    }
  }
  a{
    margin: 1.5rem;
    color: #000000;
  }
  a:last-Child{
    margin-right: 5rem;
  }
}
header.green{
  background-color: $green;
}
header.yellow{
  background-color: $yellow;
}
header.blue{
  background-color: $blue;
}
header.red{
  background-color: $red;
}
</style>