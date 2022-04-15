<template>
  <section v-if="!quizRequirements">
    <form @submit.prevent="addQuiz">
      <h2>create a new quiz</h2>
      <div>
        <label for="category">Choose category for quiz</label>
        <select v-model="category" name="category" id="category">
          <option v-for="category in categories" :value="category.id" :key="category.id">
            {{category.name}}
          </option>
        </select>
      </div>
      <div>
        <label for="quiz-name">Name your quiz</label>
        <input v-model="quizName" type="text" name="quiz-name">
        <small class="error">{{error.quizName}}</small>
      </div>
      <div>
        <label for="imgFile">Add image to quiz</label>
        <input type="file" name="imgFile" ref="imgField">
        <small class="error" v-if="error.image">{{error.image}}</small>
      </div>
      <button class="regular-button">next</button>
    </form>
  </section>
  <section v-else-if="!done">
    <form @submit.prevent="addQuestion">
      <h2>Add question to {{quizName}}</h2>
      <div>
        <label for="question">Question</label>
        <textarea v-model="question.question" name="question" id="question" maxlength="120" cols="30" rows="5"></textarea>
        <small class="error">{{error.question}}</small>
      </div>
      <div>
        <label for="right-answer">Correct answer</label>
        <input v-model="question.rightAnswer" name="right-answer" type="text">
      </div>
      <div>
        <label for="answer2">Wrong answer</label>
        <input v-model="question.answer2" name="answer2" type="text">
      </div>
      <div>
        <label for="answer3">Wrong answer</label>
        <input v-model="question.answer3" name="answer3" type="text">
      </div>
      <div>
        <label for="answer4">Wrong answer</label>
        <input v-model="question.answer4" name="answer4" type="text">
        <small class="error">{{error.answer}}</small>
      </div>
      <span>
        <button class="regular-button">Add</button>
        <button class="done">Done</button>
      </span>
    </form>
  </section>
  <section v-else>
    <h2>good job</h2>
    <button>Go to quizzes</button>
  </section>
</template>

<script>
export default {//flytta done knapp till egen modal efter addera fråga
  data(){return{
    category: 1, 
    quizName: "la bamba", 
    quizInfo: {}, 
    quizImage: FormData, 
    requiredQuizNameLength: 3,
    quizRequirements: true,
    quizQuestions: [],
    done: false,
    question: {
      question: '',
      rightAnswer: '',
      answer2: '',
      answer3: '',
      answer4: ''
    },
    error: {
      image: '',
      quizName: '',
      question: '',
      answer: ''
    }
  }},
  methods: {
    clearFields(){
      this.question.question = ''
      this.question.rightAnswer = ''
      this.question.answer2 = ''
      this.question.answer3 = ''
      this.question.answer4 = ''
    },
    addQuestion(){
      if(this.question.question.length < 1){
        this.error.question = 'Write a question'
      }else{
        this.error.question = ''
      }
      if(this.question.rightAnswer.length < 1 || this.question.answer2.length < 1 ||
        this.question.answer3.length < 1 || this.question.answer4.length < 1){
          this.error.answer = 'Write answers in all fields'
      }else{
        this.error.answer = ''
      }
      if(!this.error.answer.length && !this.error.question.length){
        this.quizQuestions.push(this.question)
        this.clearFields()
      }
    },
    addQuiz(){
      if(this.quizName.length < this.requiredQuizNameLength){
        this.error.quizName = 'Add quiz name'
      }else{
        this.error.quizName = ''
      }
      if(!this.$refs.imgField.files[0]){
        this.error.image = 'Add Image to quiz'
      }else{
        this.error.image = ''
      }
      if(this.$refs.imgField.files[0] && this.quizName.length >= this.requiredQuizNameLength){
        this.quizInfo = {
          CategoryId: this.category,
          name: this.quizName, 
          imgFile: this.$refs.imgField.files[0].name
        }
        this.quizImage = new FormData()
        this.quizImage.append("imgFile", this.$refs.imgField.files[0])
        this.quizRequirements = true
      }
    }
  }, 
  computed: {
    categories(){
      return this.$store.state.categories
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/fonts-colours.scss';
textarea{
  border-radius: 10px;
}
.error{
  color: red;
}
section{
  display: grid;
  place-items: center;
  form{
    margin-top: 2rem;
    width: 50%;
    padding: 2rem 0;
    border: 1px solid #000000;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    div{
      display: flex;
      flex-direction: column;
      width: 50%;
    }
    label{
      margin-top: 2rem;
    }
    select{
      padding: 0.5rem;
      border-radius: 8px;
    }
    button{
      margin: 2rem 2rem 0 2rem;
    }
    .done{
      background-color: green;
      color: white;
      border: none;
      border-radius: 10px;
      padding: .5rem 1.5rem;
      font-size: .8rem;
      &:hover{
      cursor: pointer;
      background-color: transparent;
      }
    }
  }
}
</style>