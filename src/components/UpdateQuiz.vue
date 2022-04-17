<template>
  <section v-if="!edit">
    <article @click="editQuiz(quiz.id)" v-for="quiz in userQuizzes" :key="quiz.id">
      <figure>
        <img :src="`http://localhost:5001/images/${quiz.imgFile}`">
      </figure>
      <h3>Name: {{quiz.name}}</h3>
      <p>Category: {{quiz.Category.name}}</p>
    </article>
  </section>
  <EditQuiz :quizId="quizToEditId" v-else />
</template>

<script>
import EditQuiz from '@/components/EditQuiz.vue';
export default {
  components: {EditQuiz},
  data(){return{
    edit: false,
    quizToEditId: Number
  }},
  computed: {
    userQuizzes(){
      return this.$store.getters.userQuizzes
    },
  },
  methods: {
    async editQuiz(quizId){
      await this.$store.dispatch('getQuizQuestions', quizId)
      this.quizToEditId = quizId
      this.edit = true
    }
  },
}
</script>

<style lang="scss" scoped>
section{
  padding: 2rem 10rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  article{
    border: 1px solid #000000;
    border-radius: 10px;
    width: 15rem;
    margin: 1rem;
    &:hover{
      cursor: pointer;
    }
    h3, p{
      margin-left: 1rem;
    }
    figure{
      margin: 0;
      width: 100%;
      img{
        border-radius: 10px 10px 0 0;
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
}
</style>