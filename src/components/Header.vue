<template>
  <header :class="{green: cat == 'nature', blue: cat == 'music',
    red: cat == 'movie', yellow: cat == 'mix'}">
    <h1 @click="$router.push('/categories')">QUIZZY</h1>
    <nav>
      <router-link to="/categories">quizzes</router-link>
      <router-link to="/profile">profile</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  props: {
    cat: String
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/fonts-colours.scss';
header{
  // width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 5rem;
  background-color: $primary;
  h1{
    font-size: 3rem;
    margin: 5rem;
    &:hover{
      cursor: pointer;
    }
  }
  a{
    margin: 2rem;
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