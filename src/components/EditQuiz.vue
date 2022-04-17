<template>
  <section v-if="quiz">
    <h2>{{quiz.name}}</h2>
    <form @click.prevent="update" class="edit" v-if="edit" ref=edit>
      <label for="question">Question:</label>
      <input v-model="question" type="text" name="question" :placeholder="questionToEdit.question">
      <label for="right-answer">Right answer</label>
      <input v-model="rightAnswer" type="text" name="right-answer" :placeholder="questionToEdit.rightAnswer">
      <label for="other-answer">Other answers</label>
      <input v-model="answer2" type="text" name="other-answer" :placeholder="questionToEdit.answer2">
      <input v-model="answer3" type="text" name="other-answer" :placeholder="questionToEdit.answer3">
      <input v-model="answer4" type="text" name="other-answer" :placeholder="questionToEdit.answer4">
      <button class="regular-button">Update</button>
    </form>
    <article @click="editQuestion(question)" v-for="(question, index) in quiz.questions" :key="index">
      <h3>Question no. {{index+1}}</h3>
      <p>{{question.question}}?</p>
      <p>Right answer: {{question.rightAnswer}}</p>
      <h4>Wrong answers:</h4>
      <span>
        <p>{{question.answer2}}</p>
        <p>{{question.answer3}}</p>
        <p>{{question.answer4}}</p>
        <button class="regular-button">Edit</button>
      </span>
    </article>
  </section>
</template>

<script>
export default {
  props: {quiz: Object},
  data(){return{
    questionToEdit: {},
    edit: false,
    question: '',
    rightAnswer: '',
    answer2: '',
    answer3: '',
    answer4: ''
  }},
  methods: {
    editQuestion(question){
      this.questionToEdit = question
      this.edit = true
      this.$refs.edit.scrollIntoView({ behavior: 'smooth' });
    },
    async update(){
      if(this.question.length < 1){
        this.question = this.questionToEdit.question
      }
      if(this.rightAnswer.length < 1){
        this.rightAnswer = this.questionToEdit.rightAnswer
      }
      if(this.answer2.length < 1){
        this.answer2 = this.questionToEdit.answer2
      }
      if(this.answer3.length < 1){
        this.answer3 = this.questionToEdit.answer3
      }
      if(this.answer4.length < 1){
        this.answer4 = this.questionToEdit.answer4
      }
      const question = {
        question: this.question,
        rightAnswer: this.rightAnswer,
        answer2: this.answer2,
        answer3: this.answer3,
        answer4: this.answer4
      }
      this.$store.dispatch('updateQuestion', {id: this.questionToEdit.id, question})
    }
  },
  async mounted(){
    await this.$store.dispatch('getQuizQuestions', this.quiz.id)
  },
}
</script>

<style lang="scss" scoped>
.edit{
  display: flex;
  flex-direction: column;
  width: 25rem;
  border: 1px solid black;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 1rem;
  input{
    margin-bottom: 1rem;
  }
}
section{
  display: flex;
  flex-direction: column;
  align-items: center;
  article{
    border: 1px solid black;
    border-radius: 10px;
    padding: 2rem;
    min-width: 25rem;
    margin-bottom: 1rem;
    span{
      display: flex;
      p{
        margin-right: 2rem;
      }
      button{
        margin: auto 1rem auto auto;
      }
    }
  }
}
</style>