<template>
  <body class="login">
    <div class="container">
      <h1>QUIZZY</h1>
      <span>
        <p @click="toggleShowLogin">login</p>
        <p @click="toggleShowSignup">signup</p>
      </span>
      <span>
        <div class="login-form" :class="{open: showLogin}">
          <form @submit.prevent="login">
            <h2>Login</h2>
            <label for="email">Email</label>
            <input v-model="email" type="email" name="email" required>
            <label for="password">Password</label>
            <input v-model="password" type="password" name="password" required>
            <button>login</button>
          </form>
        </div>
        <div class="signup-form" :class="{open: showSignup}">
          <form @submit.prevent="signUp">
            <h2>Signup</h2>
            <label for="email">Email</label>
            <input :class="{error: error.signUpEmail}" v-model="email" type="email" name="email">
            <small class="error">{{error.signUpEmail}}</small>
            <label for="password">Password</label>
            <input :class="{error: error.signUpPassword}" v-model="password" type="password" name="password">
            <label for="repeat-password">Repeat Password</label>
            <input :class="{error: error.signUpPassword}" v-model="repeatPassword" type="password" name="repeat-password">
            <small class="error">{{error.signUpPassword}}</small>
            <button>signup</button>
          </form>
        </div>
      </span>
    </div>
  </body>
</template>

<script>

export default {
  data(){return{
    showLogin: false,
    showSignup: false,
    email: '',
    password: '', 
    repeatPassword: '',
    error: {
      signUpEmail: '',
      signUpPassword: ''
    },
    minPasswordLength: 6
  }},
  methods: {
    toggleShowLogin(){
      this.showSignup = false
      this.showLogin = !this.showLogin
    }, 
    toggleShowSignup(){
      this.showLogin = false
      this.showSignup = !this.showSignup
    }, 
    trimIt(){
      this.email.trim()
      this.password.trim()
    },
    async login(){
      this.trimIt()
      await this.$store.dispatch('login', {email: this.email, password: this.password})
    },
    async signUp(){
      this.trimIt()
      if(!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(this.email)){
        this.error.signUpEmail = 'Enter valid email'
      }
      else{
        this.error.signUpEmail = ''
      }
      if(this.password < this.minPasswordLength){
        this.error.signUpPassword = 'Password needs to be at least 6 characters'
      }
      else if(this.password != this.repeatPassword){
        this.error.signUpPassword = 'Passwords needs to match'
      }
      else{
        this.error.signUpPassword = ''
      }
      if(!this.error.signUpPassword.length && !this.error.signUpEmail.length){
        await this.$store.dispatch('registerUser', {email: this.email, password: this.password})
      }
    }
  }
  
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/fonts-colours.scss";
  .login{
    width: 100%;
    height: 100%;
    background-color: $primary;
    display: grid;
    justify-content: center;
    .container{
      margin-top: 10rem;
      h1{
        font-size: 10rem;
        text-align: center;
      }
      span{
        display: flex;
        justify-content: center;
        p{
          margin: 0 2rem;
          &:hover{
            cursor: pointer;
          }
        }
      }
    }
    .login-form, .signup-form{
      background: white;
      width: 20rem;
      transform: translateY(3rem);
      margin: 0 5rem;
      border-radius: 10px;
      display: none;
    }
    .login-form.open, .signup-form.open{
      display: block;
    }
   .signup-form{
     transform: translate(12rem, 1rem);
   }
   .login-form{
     transform: translate(-12rem, 1rem);
   }
   form{
     display: flex;
     flex-direction: column;
     padding: 1rem;
     label{
       margin-top: .5rem;
     }
     h2{
       margin-bottom: 1rem;
     }
     button{
       margin: .2rem 0;
       align-self: flex-end;
     }
    
   }
    .error{
      color: red;
    }
    input.error{
      border: 1px solid red;
    }
  }
</style>
