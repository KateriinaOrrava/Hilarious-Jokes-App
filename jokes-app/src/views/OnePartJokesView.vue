<script lang="ts">
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
interface SinglePartJoke {
  category: 'Any' | 'Misc' | 'Programming' | 'Dark' | 'Pun';
  type: string;
  joke: string;
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
      jokesList: [] as SinglePartJoke[],
      categorySingle: 'Any',
      value: '',
      selected_jokes: [] as number[],
      categories: ['Any', 'Misc', 'Programming', 'Dark', 'Pun'],
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

    async getSingleTypeJokesOnLoad() {
      const finalRes1 = await fetch(
        'https://v2.jokeapi.dev/joke/Any?type=single&amount=10').then((res)=>res.json())
      ;
      this.jokesList = finalRes1.jokes;
    },

    async getDataByCategorySingle(e: any) {
      this.categorySingle = e.target.value;
      const resJokesSingleType = await fetch(
        `https://v2.jokeapi.dev/joke/${this.categorySingle}?type=single&amount=10`
      );
      const singleTypeJokes = await resJokesSingleType.json();
      this.jokesList = singleTypeJokes.jokes;
    },

    addOnePartJokeToFavorites(joke: string, category: string, id: number) {
      let newJokeOnePart = {
        joke: joke,
        category: category,
        id: id,
      };
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJokeOnePart),
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
      <div v-for="category in categories" class="joke-categories__wrapper">
        <button
          :value="category"
          @click="getDataByCategorySingle($event)"
          class="category-button"
        >
          {{ category }}
        </button>
        <div class="drip-1"></div>
        <div class="drip-2"></div>
        <div class="drip-3"></div>
      </div>
    </div>

    <div class="jokes-container">
      <div v-for="joke in jokesList" class="single-part-joke">
        <div
          :key="joke.id"
          :class="{ selected: selected_jokes.includes(joke.id) }"
        >
          <div class="one-part-joke__wrapper">
            <button
              class="add-joke-to-favorites"
              @click="
                {
                  addOnePartJokeToFavorites(joke.joke, joke.category, joke.id);
                  toggle_selection_for(joke.id);
                  notify();
                }
              "
            >
              🤍
            </button>
            <p class="single-part-joke__text">{{ joke.joke }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.add-joke-to-favorites {
  font-size: 2em;
}

.one-part-joke__wrapper {
  padding: 5px 5px;
  display: flex;
}
.jokes-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.joke-categories {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}
.selected {
  color: white;
  background-color: #685bbf;
  border-radius: 20px;
  pointer-events: none;
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
  /* color: #464444; */
  font-weight: normal;
  font-size: 18px;
  background: #b693ef;
  border-radius: 10px 10px 10px 0px;
  padding: 5px 30px;
  border: none;
  transition: 0.5s ease;
  box-shadow: 0 15px 60px -5px rgba(0, 0, 0, 0.5);
  font-weight: 700;
}
.single-part-joke__text {
  padding: 5px;
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
  margin: 0px 0px;
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
.single-part-joke {
  background-color: rgba(205, 195, 198, 0.711);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  align-items: stretch;
}
.single-part-joke:hover {
  background-color: rgb(230, 214, 218);
  color: #311f22;
  min-width: 20%;
}
</style>
