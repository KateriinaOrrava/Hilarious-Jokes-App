<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import Footer from './components/Footer.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="Hilarious Jokes" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/onePartJokes">One part jokes</RouterLink>
        <RouterLink to="/twoPartJokes">Two part jokes</RouterLink>
        <RouterLink to="/favorites">Favorites</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
  <Footer></Footer>
</template>

<style scoped>
.single-part-joke,
.two-part-joke {
  background-color: #3936374f;
  padding: 20px;
  font-size: 1.5rem;
  color: #0c0809;
  border-radius: 10px;
  min-width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrapper{
  widows: 100%;
}
header {
  line-height: 1.5;
  max-height: 100vh;
  padding-top: 20px;
}

nav {
  min-width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}
nav a:hover {
  background-color: #b693ef;
  color: white;
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
  .single-part-joke,
  .two-part-joke {
    background-color: rgb(40, 39, 39);
    border-radius: 20px;
    padding: 20px;
  }
  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
