<template>
<main>
  <Header :cat='$route.query.name' />
  <section v-if="!loading">
    <div class="container" :class="{green: $route.query.name == 'nature', blue: $route.query.name == 'music',
        red: $route.query.name == 'movie', yellow: $route.query.name == 'mix'}">
      <article v-if="guessing && !done">
        <h2>{{quiz.name}}</h2>
        <figure>
          <img :src="`${BASE_URL}/images/${quiz.imgFile}`">
        </figure>
        <h3>{{question.question}}?</h3>
        <ul v-for="(answer, index) in shuffledAnswers" :key="index">
          <input v-model="picked" type="radio" :id="answer" name="answer" :value="answer">
          <label :for="answer">{{answer}}</label>
        </ul>
        <button class="regular-button" @click="guess">Guess</button>
      </article>
      <article v-else-if="!guessing && !done">
        <h2>{{quiz.name}}</h2>
        <figure>
          <img :src="`${BASE_URL}/images/${quiz.imgFile}`">
        </figure>
        <h3>{{question.question}}?</h3>
        <h3 v-if="isRight">Congratulations</h3>
        <h3 v-else>Sorry</h3>
        <p>The right answer is {{question.rightAnswer}}</p>
        <h4>Youre score is now {{score}}</h4>
        <button class="regular-button" @click="nextQuestion">Next</button>
      </article>
      <article v-if="done">
        <h2>Good Job</h2>
        <p>Youre final score is {{score}}points</p>
        <button class="regular-button" @click="$router.push('/categories')">OK</button>
      </article>
    </div>
  </section>
</main>
</template>

<script>
import Header from '@/components/Header'
export default {
  components: {Header},
  data(){return{
    BASE_URL: process.env.VUE_APP_BASE_URL,
    questionIteration: 0,
    picked: Boolean, 
    guessing: true,
    score: 0,
    isRight: false,
    done: false, 
    quizId: this.$route.params.id,
  }},
  beforeDestroy(){
    this.$store.dispatch('sendScore', {score: this.score, quizId: this.quizId})
  },
  async mounted(){
    await this.$store.dispatch('getQuizQuestions', this.$route.params.id)
  },
  methods: {
    nextQuestion(){
      if(this.questionIteration < this.quiz.questions.length - 1){
        this.questionIteration++
        this.guessing = true
        this.isRight = false
      }
      else{
        this.done = true
      }
    },
    guess(){
      this.guessing = false
      if(this.picked == this.question.rightAnswer){
        this.score++
        this.isRight = true
      }
    }
  },
  computed: {
    loading(){
      return this.$store.state.quiz.loading
    },
    quiz(){
      return this.$store.state.quiz.quizzes[this.$route.params.id]
    }, 
    question(){
      return this.quiz.questions[this.questionIteration]
    }, 
    shuffledAnswers(){
      return [
        this.question.rightAnswer, 
        this.question.answer2, 
        this.question.answer3,
        this.question.answer4
        ]
        .sort(() => Math.random() - 0.5)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/fonts-colours.scss';
section{
  display: grid;
  place-items: center;
  .container{
    width: 70%;
    margin-top: 3rem;
    display: grid;
    place-items: center;
    padding: 3rem 0;
    border-radius: 10px;
    article{
      width: 25rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      figure{
        margin: 0;
        width: 25rem;
        border-radius: 4px;
        img{
          border-radius: 4px;
          max-width: 100%;
          max-height: 100%;
        }
      }
      ul{
        margin: 0;
        align-self: flex-start;
        input{
          margin-right: .6rem;
          vertical-align: top;
          margin-bottom: 1rem;
        }
      }
    }
  }
}
.yellow{
  background-color: $yellow;
}
.red{
  background-color: $red;
}
.blue{
  background-color: $blue;
}
.green{
  background-color: $green;
}
</style>