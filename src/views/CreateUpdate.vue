<template>
<main>
  <Header/>
  <nav>
    <a @click="view = 'createQuiz'">create Quiz</a>
    <a @click="view = 'updateQuiz'">update Quiz</a>
  </nav>
  <CreateQuiz v-if="view == 'createQuiz'" />
  <UpdateQuiz v-if="view == 'updateQuiz'"/>
</main>
</template>

<script>
import Header from '@/components/Header'
import CreateQuiz from '@/components/CreateQuiz'
import UpdateQuiz from '@/components/UpdateQuiz'
export default {
  components: {Header, CreateQuiz, UpdateQuiz},
  async mounted(){
    await this.$store.dispatch('getMe')
  }, 
  data(){return{
    view: 'createQuiz'
  }},
}
</script>

<style lang="scss" scoped>
nav{
  width: 100%;
  display: flex;
  justify-content: center;
  a{
    margin: 1rem;
  }
}
</style>