<template>
  <main>
    <Header :cat='$route.query.name' />
    <article v-for="quiz in quizzes" :key="quiz.id">
      <figure>
        <img :src="`http://localhost:5001/images/${quiz.imgFile}`">
      </figure>
      <h3>quiz.name</h3>

    </article>
  </main>
</template>

<script>
import Header from '@/components/Header';
export default {
  beforeCreate(){
    this.$store.dispatch('getQuizzes', this.$route.params.catId)
  },
  components: {Header},
  data(){return{
  }},
  computed: {
    quizzes(){
      if(this.$route.query.name == 'music'){
        return this.$store.getters.musicCategory
      }
      else return null
    }
  }
}
</script>

<style lang="scss" scoped>

</style>