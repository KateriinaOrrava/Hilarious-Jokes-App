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
      categoryTwoPart: 'Any',
      value: '',
      refs: String,
    };
  },
  methods: {
    async getTwoPartTypeJokesOnLoad() {
      const resJokesTwoPartType = await fetch(
        'https://v2.jokeapi.dev/joke/Any?type=twopart&amount=10'
      );
      const finalRes2 = await resJokesTwoPartType.json();
      this.listItemsTwoPart = finalRes2.jokes;
    },

    async getDataByCategoryTwoPart(e: any) {
      this.categoryTwoPart = e.target.value;
      const resJokesTwoPartType = await fetch(
        `https://v2.jokeapi.dev/joke/${this.categoryTwoPart}?type=twopart&amount=10`
      );
      const twoPartTypeJokes = await resJokesTwoPartType.json();
      this.listItemsTwoPart = twoPartTypeJokes.jokes;
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
    this.getTwoPartTypeJokesOnLoad();
  },
};
</script>
<template>
  <div>
    <h3>CATEGORY: {{ categoryTwoPart }}</h3>
    <div>
      <button
        value="Any"
        v-on:click="getDataByCategoryTwoPart($event)"
        class="toggle-category"
      >
        Any
      </button>
      <button
        value="Misc"
        v-on:click="getDataByCategoryTwoPart($event)"
        class="toggle-category"
      >
        Misc
      </button>
      <button
        value="Programming"
        v-on:click="getDataByCategoryTwoPart($event)"
        class="toggle-category"
      >
        Programming
      </button>
      <button
        value="Dark"
        v-on:click="getDataByCategoryTwoPart($event)"
        class="toggle-category"
      >
        Dark
      </button>
      <button
        value="Pun"
        v-on:click="getDataByCategoryTwoPart($event)"
        class="toggle-category"
      >
        Pun
      </button>
      <button
        value="Spooky"
        v-on:click="getDataByCategoryTwoPart($event)"
        class="toggle-category"
      >
        Spooky
      </button>
      <button
        value="Christmas"
        v-on:click="getDataByCategoryTwoPart($event)"
        class="toggle-category"
      >
        Christmas
      </button>
    </div>

    <div class="jokes-container">
      <div v-for="itemTwoPart in listItemsTwoPart" class="two-part-joke">
        <button
          :class="{ active: isLiked }"
          @click="toggle"
          v-on:click="addJokeToFavorites(itemTwoPart.id)"
        >
          {{ isLiked ? '🤍' : '❤️' }}
        </button>
        <br />
        {{ itemTwoPart.delivery }}
        <br />
        {{ itemTwoPart.setup }}
        <br />
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
