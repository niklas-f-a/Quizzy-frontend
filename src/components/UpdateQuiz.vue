<template>
  <section>
    <article v-for="quiz in quizzes" :key="quiz.id">
      <h3>{{quiz.name}}</h3>
      {{quiz}}
    </article>
  </section>
</template>

<script>
export default {
  props: {
    quizzes: Array
  }
}
</script>

<style lang="scss" scoped>

</style>