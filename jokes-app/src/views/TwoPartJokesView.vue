<script lang="ts">
import { toast } from 'vue3-toastify';

interface TwoPartJokeType {
  category: string;
  type: string;
  setup: string;
  delivery: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  id: number;
  safe: boolean;
  lang: string;
}

export default {
  data() {
    return {
      listItemsTwoPart: [] as TwoPartJokeType[],
      categoryTwoPart: 'Any',
      value: '',
      selected_jokes: [] as number[],
    };
  },
  methods: {
    notify() {
      toast('Added to favorites!', {
        autoClose: 1000,
      });
    },
    toggle_selection_for(id: number) {
      if (this.selected_jokes.includes(id)) {
        this.selected_jokes = this.selected_jokes.filter((joke) => joke !== id);
      } else {
        this.selected_jokes.push(id);
      }
    },
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
    <div class="joke-categories">
      <div class="joke-categories__wrapper">
        <button
          value="Any"
          v-on:click="getDataByCategoryTwoPart($event)"
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
          v-on:click="getDataByCategoryTwoPart($event)"
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
          v-on:click="getDataByCategoryTwoPart($event)"
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
          v-on:click="getDataByCategoryTwoPart($event)"
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
          v-on:click="getDataByCategoryTwoPart($event)"
          class="category-button"
        >
          Pun
        </button>
        <div class="drip-1"></div>
        <div class="drip-2"></div>
        <div class="drip-3"></div>
      </div>
      <div>
        <button
          value="Spooky"
          v-on:click="getDataByCategoryTwoPart($event)"
          class="category-button"
        >
          Spooky
        </button>
        <div class="drip-1"></div>
        <div class="drip-2"></div>
        <div class="drip-3"></div>
      </div>
      <div class="joke-categories__wrapper">
        <button
          value="Christmas"
          v-on:click="getDataByCategoryTwoPart($event)"
          class="category-button"
        >
          Christmas
        </button>
        <div class="drip-1"></div>
        <div class="drip-2"></div>
        <div class="drip-3"></div>
      </div>
    </div>
  </div>
  <div class="jokes-container">
    <div v-for="joke in listItemsTwoPart" class="two-part-joke">
      <div
        :key="joke.id"
        :class="{ selected: selected_jokes.includes(joke.id) }"
        class="two-part-joke__wrapper"
      >
        <button
          class="add-joke-to-favorites"
          v-on:click="
            {
              addTwoPartJokeToFavorites(
                joke.category,
                joke.setup,
                joke.delivery,
                joke.id
              );
              toggle_selection_for(joke.id);
              notify();
            }
          "
        >
          🤍
        </button>
        <p class="two-part-joke__wrapper--setup">{{ joke.setup }}</p>

        <div class="two-part-joke__wrapper--delivery">

          <p>{{ joke.delivery }}</p>
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.selected {
  color: white;
  background-color: #685bbf;
  border-radius: 20px;
  cursor: not-allowed;
}
.two-part-joke__wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.jokes-container__two-part {
  display: flex;
}
.add-joke-to-favorites {
  background-color: transparent;
  border: none;
}
.two-part-joke__wrapper--setup {
  font-style: italic;
  font-weight: 600;
}
.two-part-joke__wrapper--delivery {
  color: black;
  transform: rotate(180deg);
}
.two-part-joke__wrapper--delivery:hover {
  transform: rotate(0deg);
  transition: transform 0.6s ease;
}
.single-part-joke,
.two-part-joke {
  background-color: #8f888a9a;
  padding: 10px;
  font-size: 1rem;
  color: #311f22;
  border-radius: 10px;
  min-width: 10%;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
