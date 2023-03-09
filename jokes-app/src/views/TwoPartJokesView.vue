<script lang="ts">

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
      isLiked: false,
      categoryTwoPart: 'Any',
      value: '',
      refs: String,
      value1: true,
      selected_options: [] as TwoPartJokeType["id"][],

    };
  },
  methods: {
    toggle_selection_for(option:number) {
      if (this.selected_options.includes(option)) {
        this.selected_options = this.selected_options.filter(
          (item) => item !== option
        );
      } else {
        this.selected_options.push(option);
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
        :class="{ selected: selected_options.includes(joke.id) }"
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
            }
          "
        >
          🤍
        </button>
        <br />
        {{ joke.setup }}
        <br />
        <br />
        {{ joke.delivery }}

        <br />
      </div>
    </div>
  </div>
</template>

<style>
.invisible {
  visibility: hidden;
}
.selected {
  color: white;
  background-color: #685bbf;
  border-radius: 20px;
  display: none;
}
.add-joke-to-favorites {
  background-color: transparent;
  border: none;
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
