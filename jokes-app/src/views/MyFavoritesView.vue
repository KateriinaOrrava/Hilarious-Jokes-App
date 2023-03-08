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
      listItemsOnePart: [],
      isLiked: false,
      categoryTwoPart: 'Any',
      value: '',
      refs: String,
    };
  },
  methods: {
    async getTwoPartTypeJokesOnLoad() {
      const resJokesTwoPartType = await fetch(
        'http://localhost:3004/twoPartJokes'
      );
      const finalRes2 = await resJokesTwoPartType.json();
      console.log(finalRes2)
      this.listItemsTwoPart = finalRes2;
    },
    async getOnePartTypeJokesOnLoad() {
      const resJokesOnePartType = await fetch(
        'http://localhost:3004/onePartJokes'
      );
      const finalRes1 = await resJokesOnePartType.json();
      this.listItemsOnePart = finalRes1;
    },
    async deleteOnePartJoke(id: number) {
      console.log('delete', id);

      const requestOptions = {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer my-token',
          'My-Custom-Header': 'foobar',
        },
      };
      fetch(`http://localhost:3004/jokeOnePartToDelete/${id}`, requestOptions);
    },
    async deleteTwoPartJoke(id: number) {
      console.log('delete', id);

      const requestOptions = {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer my-token',
          'My-Custom-Header': 'foobar',
        },
      };
      fetch(`http://localhost:3004/jokeTwoPartToDelete/${id}`, requestOptions);
    },
  },
  mounted() {
    this.getTwoPartTypeJokesOnLoad();
    this.getOnePartTypeJokesOnLoad();
  },
};
</script>
<template>
  <h3>FAVORITE ONE PART JOKES</h3>
  <div class="jokes-container">
    <div v-for="itemOnePart in listItemsOnePart" class="two-part-joke">
      <br />
      {{ itemOnePart.joke }}
      <br />
      <button v-on:click="deleteOnePartJoke(itemOnePart.id)">❌</button>
    </div>
  </div>
  <br />
  <br /><br />
  <h3>FAVORITE TWO PART JOKES</h3>
  <div>
    <div class="jokes-container">
      <div v-for="itemTwoPart in listItemsTwoPart" class="two-part-joke">
        <br />
        {{ itemTwoPart.delivery }}
        <br />
        {{ itemTwoPart.setup }}
        <br />
        <button v-on:click="deleteTwoPartJoke(itemTwoPart.id)">❌</button>
      </div>
    </div>
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
