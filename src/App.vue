<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import './assets/styles/fonts-colours.scss';
html, body, h1, h2{
  margin: 0;
  padding: 0;
}
#app {
 width: 100vw;
 height: 100vh;
 h1{
   font-family: $header;
 }
 h2, h3, p, a, button{
   font-family: $para;
 }
 a{
   text-decoration: none;
 }
 button{
   background-color: $primary;
   border: 1px solid $primary;
   border-radius: 10px;
   padding: .5rem 1.5rem;
   font-size: .8rem;
   &:hover{
     cursor: pointer;
     background-color: transparent;
   }
 }
 input{
   padding: .5rem;
   border-radius: 8px;
   border: 1px solid;
 }
}
</style>
