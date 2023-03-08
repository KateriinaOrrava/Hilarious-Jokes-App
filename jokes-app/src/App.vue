<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
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
</template>

<style scoped>
.jokes-container {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
.single-part-joke,
.two-part-joke {
  background-color: #e6d6da;
  padding: 20px;
  font-size: 1rem;
  color: #311f22;
  border-radius: 10px;
  min-width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}

header {
  line-height: 1.5;
  max-height: 100vh;
  padding-top: 20px;
}

nav {
  width: 100%;
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
