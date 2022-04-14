<template>
  <main>
    <Header />
    <div class="container">
      <section class="categories">
        <article v-for="cat in categories" :key="cat.id"
          :class="{green: cat.name == 'nature', blue: cat.name == 'music',
            red: cat.name == 'movie', yellow: cat.name == 'mix'}"
          @click="$router.push({path: '/categories/'+cat.id, query:{name: cat.name}})"
        >
          <h3>{{cat.name}}</h3>
        </article>
      </section>
    </div>
  </main>
</template>

<script>
import Header from '@/components/Header';
export default {
  components: {Header},
  async mounted(){
    this.$store.dispatch('getCategories')
  }, 
  computed: {
    categories(){
      return this.$store.state.categories
    }
  }, 
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/fonts-colours.scss';
.container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.categories{
  height: 100%;
  width: 65%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 200px;
  place-items: center;
  margin-top: 4rem;
  article{
    height: 10rem;
    width: 20rem;
    display: grid;
    place-items: center;
    border-radius: 10px;
    filter: brightness(100%);
    transition: all 1s ease;
    &:hover{
      cursor: pointer;
      filter: brightness(130%);
    }
    h3{
      font-size: 1.5rem;
    }
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
  article.green{
    background-color: $green;
  }
}
</style>