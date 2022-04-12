<template>
  <header>
    <h1>QUIZZY</h1>
    <nav>
      <router-link to="/categories">quizzes</router-link>
      <router-link to="/profile">profile</router-link>
    </nav>
  </header>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '../assets/styles/fonts-colours.scss';
header{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 5rem;
  background-color: $primary;
  h1{
    font-size: 3rem;
    margin: 5rem;
  }
  a{
    margin: 2rem;
    color: #000000;
  }
  a:last-Child{
    margin-right: 5rem;
  }
}
</style>