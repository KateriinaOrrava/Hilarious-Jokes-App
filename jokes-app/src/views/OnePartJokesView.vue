<script lang="ts">
import { stringifyExpression } from '@vue/compiler-core';

import { ref } from 'vue';
// const props = defineProps({
//   item: {
//     category: String,
//     type: String,
//     joke: String,
//     flags: {
//       nsfw: Boolean,
//       religious: Boolean,
//       political: Boolean,
//       racist: Boolean,
//       sexist: Boolean,
//       explicit: Boolean,
//     },
//     id: Number,
//     safe: Boolean,
//     lang: String,
//   },
//   listItems: [],
// });

export default {
  data() {
    return {
      listItems: [],
      listItemsTwoPart: [],
      isLiked: false,
      categorySingle: 'Any',
      value: '',
      refs: String,
    };
  },
  methods: {
    async getSingleTypeJokesOnLoad() {
      const resJokesSingleType = await fetch(
        'https://v2.jokeapi.dev/joke/Any?type=single&amount=10'
      );
      const finalRes1 = await resJokesSingleType.json();
      this.listItems = finalRes1.jokes;
    },

    async getDataByCategorySingle(e: any) {
      const categorySingle = e.target.value;
      const resJokesSingleType = await fetch(
        `https://v2.jokeapi.dev/joke/${categorySingle}?type=single&amount=10`
      );
      const singleTypeJokes = await resJokesSingleType.json();
      this.listItems = singleTypeJokes.jokes;
    },

    addJokeToFavorites(jokeId: string) {
      console.log(jokeId);
      console.log('clicked');
    },

    toggle() {
      if (!this.isLiked) {
        this.isLiked = true;
      } else {
        this.isLiked = false;
      }
    },
  },
  mounted() {
    this.getSingleTypeJokesOnLoad();
  },
};
</script>
<template>
  <div>
    <h2>CATEGORIES</h2>
    <h3>Type: {{ categorySingle }}</h3>
    <div>
      <button value="Any" v-on:click="getDataByCategorySingle($event)">
        Any
      </button>
      <button value="Misc" v-on:click="getDataByCategorySingle($event)">
        Misc
      </button>
      <button value="Programming" v-on:click="getDataByCategorySingle($event)">
        Programming
      </button>
      <button value="Dark" v-on:click="getDataByCategorySingle($event)">
        Dark
      </button>
      <button value="Pun" v-on:click="getDataByCategorySingle($event)">
        Pun
      </button>
    </div>
    <div class="jokes-container">
      <div v-for="item in listItems" class="single-part-joke">
        <!-- <button :class="{ active: isLiked }" @click="toggle">
          {{ isLiked ? '🤍' : '❤️' }}
        </button> -->
        <button v-on:click="addJokeToFavorites(item.id)">☆</button>
        <p>{{ item.joke }}</p>
      </div>
    </div>
    <br />
  </div>
</template>

<style>
.toggle-category {
  cursor: pointer;
  width: max-content;
  border-radius: 5px;
  padding: 2%;
}
.jokes-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  flex-wrap: wrap;
  gap: 5px;
}
.single-part-joke {
  background-color: blanchedalmond;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
