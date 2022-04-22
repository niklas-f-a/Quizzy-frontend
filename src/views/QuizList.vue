<template>
  <main>
    <Header :cat='$route.query.name' />
    <section>
      <div class="container">
        <article v-for="quiz in quizzes" :key="quiz.id"
          :class="{green: $route.query.name == 'nature', blue: $route.query.name == 'music',
            red: $route.query.name == 'movie', yellow: $route.query.name == 'mix'}"
          @click="hasUserTakenQuiz(quiz.id, $route.query.name)"
        >
          <figure>
            <img :src="`${BASE_URL}/images/${quiz.imgFile}`">
          </figure>
          <h3>{{quiz.name}}</h3>
        </article>
      </div>
      <button @click="loadMoreQuizzes" class="regular-button">Load more quizzes</button>
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
    BASE_URL: process.env.VUE_APP_BASE_URL,
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
      }else return null
    },
    currentPage(){
      return this.$store.state.quiz.currentPage
    },
    maxPages(){
      if(this.$route.query.name == 'music'){
        return this.$store.getters.maxMusicPages
      }
      if(this.$route.query.name == 'nature'){
        return this.$store.getters.maxNaturePages
      }
      if(this.$route.query.name == 'movie'){
        return this.$store.getters.maxMoviePages
      }
      if(this.$route.query.name == 'mix'){
        return this.$store.getters.maxMixPages
      }else{
        return null
      }
    }
  },
  methods: {
    async hasUserTakenQuiz(id, categoryName){
      await this.$store.dispatch('hasUserTakenQuiz', {id, categoryName})
    },
    loadMoreQuizzes(){
      this.$store.dispatch('increasePageCounter', {maxPages: this.maxPages, catId: this.$route.params.catId})
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/fonts-colours.scss';
section{
  display: flex;
  flex-direction: column;
  button{
    margin-top: 2rem;
    align-self: center;
  }
  nav{
    align-self: center;
    display: flex;
    align-items: center;
    p{
      margin: .6rem;
    }
    a:last-child{
      transform: rotate(180deg);
    }
  }
}
.container{
  padding: 0 12rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 20rem;
  article{
    margin: 3rem 1rem 0 1rem;
    width: 15rem;
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