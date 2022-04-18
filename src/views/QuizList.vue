<template>
  <main>
    <Header :cat='$route.query.name' />
    <section>
      <article v-for="quiz in quizzes" :key="quiz.id"
        :class="{green: $route.query.name == 'nature', blue: $route.query.name == 'music',
          red: $route.query.name == 'movie', yellow: $route.query.name == 'mix'}"
        @click="hasUserTakenQuiz(quiz.id, $route.query.name)"
      >
        <figure>
          <img :src="`http://localhost:5001/images/${quiz.imgFile}`">
        </figure>
        <h3>{{quiz.name}}</h3>
      </article>
    </section>
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
      if(this.$route.query.name == 'nature'){
        return this.$store.getters.natureCategory
      }
      if(this.$route.query.name == 'movie'){
        return this.$store.getters.movieCategory
      }
      if(this.$route.query.name == 'mix'){
        return this.$store.getters.mixCategory
      }
   
      else return null
    }
  },
  methods: {
    async hasUserTakenQuiz(id, categoryName){
      await this.$store.dispatch('hasUserTakenQuiz', {id, categoryName})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/fonts-colours.scss';
section{
  padding: 0 5rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  article{
    margin: 3rem 1rem 0 1rem;
    width: 15rem;
    height: 20rem;
    border-radius: 10px;
    transition: transform .2s ease-in-out;
    &:hover{
      cursor: pointer;
      transform: scale(1.1);
    }
    figure{
      margin: 0;
      width: 100%;
      height: 70%;
      img{
        border-radius: 10px 10px 0 0;
        display: block;
        max-width: 100%;
        max-height: 100%;
        margin: auto;
      }
    }
    h3{
      margin-left: 1rem;
    }
  }
  article.green{
    background-color: $green;
  }
  article.blue{
    background-color: $blue;
  }
  article.yellow{
    background-color: $yellow;
  }
  article.red{
    background-color: $red;
  }
}
</style>