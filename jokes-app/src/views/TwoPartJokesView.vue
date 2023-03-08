<script lang="ts">
import { stringifyExpression } from '@vue/compiler-core';
import { toRefs, defineProps } from 'vue';
import { ref } from 'vue';
const props = defineProps({
  item: {
    category: String,
    type: String,
    setup: String,
    delivery: String,
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
      categoryTwoPart: 'Any',
      value: '',
      refs: String,
      value1: true,
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

    addTwoPartJokeToFavorites(
      category: string,
      setup: string,
      delivery: string,
      id: number
    ) {
      let newJoke2 = {
        category: category,
        setup: setup,
        delivery: delivery,
        id: id,
      };
      console.log(newJoke2);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJoke2),
      };
      fetch('http://localhost:3004/addTwoPartJokes', requestOptions).then(
        (response) => response.json()
      );
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
      <div
        v-for="itemTwoPart in listItemsTwoPart"
        class="two-part-joke"
        :class="{ invisible: !value1 }"
      >
        <button
          class="add-joke-to-favorites"
          v-on:click="
            addTwoPartJokeToFavorites(
              itemTwoPart.category,
              itemTwoPart.setup,
              itemTwoPart.delivery,
              itemTwoPart.id
            )
          "
        >
          🤍
        </button>
        <br />
        {{ itemTwoPart.setup }}
        <br />
        {{ itemTwoPart.delivery }}

        <br />
      </div>
    </div>
  </div>
</template>

<style>
.invisible {
  visibility: hidden;
}
.add-joke-to-favorites {
  background-color: transparent;
  border: none;
}
.jokes-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  flex-wrap: wrap;
  gap: 5px;
}
.single-part-joke,
.two-part-joke {
  background-color: #e6d6da9a;
  padding: 20px;
  font-size: 1rem;
  color: #311f22;
  border-radius: 10px;
  min-width: 20%;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
