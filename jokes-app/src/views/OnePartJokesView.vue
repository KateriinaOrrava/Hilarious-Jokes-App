<script lang="ts">
import { stringifyExpression } from '@vue/compiler-core';
import { toRefs, defineProps } from 'vue';
import { ref } from 'vue';
const props = defineProps({
  item: {
    category: String,
    type: String,
    joke: String,
    flags: {
      nsfw: Boolean,
      religious: Boolean,
      political: Boolean,
      racist: Boolean,
      sexist: Boolean,
      explicit: Boolean,
    },
    id: Number,
    safe: Boolean,
    lang: String,
  },
  listItems: [],
});

export default {
  data() {
    return {
      listItems: [],
      listItemsTwoPart: [],
      isLiked: false,
      categorySingle: 'Any',
      value: '',
      refs: String,
      isShowing: true,
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
      this.categorySingle = e.target.value;
      const resJokesSingleType = await fetch(
        `https://v2.jokeapi.dev/joke/${this.categorySingle}?type=single&amount=10`
      );
      const singleTypeJokes = await resJokesSingleType.json();
      this.listItems = singleTypeJokes.jokes;
    },

    addOnePartJokeToFavorites(joke: string, category: string, id: number) {
      let newJoke = {
        joke: joke,
        category: category,
        id: id,
      };
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJoke),
      };
      fetch('http://localhost:3004/addOnePartJokes', requestOptions).then(
        (response) => response.json()
      );
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
    <div class="joke-categories">
      <div class="joke-categories__wrapper">
        <button
          value="Any"
          v-on:click="getDataByCategorySingle($event)"
          class="category-button"
        >
          Any
        </button>
        <div class="drip-1"></div>
        <div class="drip-2"></div>
        <div class="drip-3"></div>
      </div>
      <div class="joke-categories__wrapper">
        <button
          value="Misc"
          v-on:click="getDataByCategorySingle($event)"
          class="category-button"
        >
          Misc
        </button>
        <div class="drip-1"></div>
        <div class="drip-2"></div>
        <div class="drip-3"></div>
      </div>
      <div class="joke-categories__wrapper">
        <button
          value="Programming"
          v-on:click="getDataByCategorySingle($event)"
          class="category-button"
        >
          Programming
        </button>
        <div class="drip-1"></div>
        <div class="drip-2"></div>
        <div class="drip-3"></div>
      </div>
      <div class="joke-categories__wrapper">
        <button
          value="Dark"
          v-on:click="getDataByCategorySingle($event)"
          class="category-button"
        >
          Dark
        </button>
        <div class="drip-1"></div>
        <div class="drip-2"></div>
        <div class="drip-3"></div>
      </div>
      <div class="joke-categories__wrapper">
        <button
          value="Pun"
          v-on:click="getDataByCategorySingle($event)"
          class="category-button"
        >
          Pun
        </button>
        <div class="drip-1"></div>
        <div class="drip-2"></div>
        <div class="drip-3"></div>
      </div>
    </div>
    <div class="jokes-container">
      <div v-for="item in listItems" class="single-part-joke">
        <button
        class="add-joke-to-favorites"
          v-on:click="
            addOnePartJokeToFavorites(item.joke, item.category, item.id)
          "
        >
          🤍
        </button>
        <p>{{ item.joke }}</p>
      </div>
    </div>
    <br />
  </div>
</template>

<style>
.jokes-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
}
.joke-categories {
  display: flex;
  justify-content: center;
  gap: 20px;
}
.active {
  background-color: red;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
.joke-categories__wrapper {
  position: relative;
  padding-bottom: 20px;
}

.category-button {
  color: #464444;
  font-weight: normal;
  font-size: 18px;
  background: #b693ef;
  border-radius: 10px;
  padding: 5px 50px;
  border: none;
  transition: 0.5s ease;
  box-shadow: 0 15px 60px -5px rgba(0, 0, 0, 0.5);
}

.category-button:hover {
  box-shadow: none;
  cursor: pointer;
}

.category-button:hover + .drip-1 {
  height: 50px;
}

.category-button:hover ~ .drip-2 {
  height: 90px;
}

.category-button:hover ~ .drip-3 {
  height: 30px;
}

.drip-1 {
  position: absolute;
  width: 40px;
  height: 0px;
  border-radius: 0 0 21px 21px;
  background: #efd5e7;
  margin: 0px 80px;
  transition: height 0.9s ease;
}

.drip-2 {
  position: absolute;
  width: 24px;
  height: 0px;
  border-radius: 0 0 21px 21px;
  background: #e9c5de;
  margin: 0px 55px;
  transition: height 1.5s ease;
}

.drip-3 {
  position: absolute;
  width: 19px;
  height: 0px;
  border-radius: 0 0 21px 21px;
  background: #bab2b79a;
  margin: 0px 20px;
  transition: height 0.7s ease;
}
.single-part-joke{
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
}
.single-part-joke:hover{
  background-color: rgb(230, 214, 218);
  padding: 20px;
  color: #311f22;
  border-radius: 10px;
  min-width: 20%;
}
</style>
