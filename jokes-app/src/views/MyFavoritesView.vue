<script lang="ts">
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
interface SinglePartJoke {
  category: string;
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
      listItemsOnePart: [] as SinglePartJoke[],
      listItems: [],
      isLiked: false,
    };
  },

  methods: {
    toastThatJokeWasDeleted() {
      toast('Deleted from favorites', {
        autoClose: 1000,
      });
    },

    async getTwoPartTypeJokesOnLoad() {
      const resJokesTwoPartType = await fetch(
        'http://localhost:3004/twoPartJokes'
      );
      const finalRes2 = await resJokesTwoPartType.json();
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
      const requestOptions = {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer my-token',
          'My-Custom-Header': 'foobar',
        },
      };
      fetch(
        `http://localhost:3004/jokeOnePartToDelete/${id}`,
        requestOptions
      ).then(
        () =>
          (this.listItemsOnePart = this.listItemsOnePart.filter(
            (joke) => joke.id !== id
          ))
      );
    },

    async deleteTwoPartJoke(id: number) {
      const requestOptions = {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer my-token',
          'My-Custom-Header': 'foobar',
        },
      };
      fetch(
        `http://localhost:3004/jokeTwoPartToDelete/${id}`,
        requestOptions
      ).then(
        () =>
          (this.listItemsTwoPart = this.listItemsTwoPart.filter(
            (joke) => joke.id !== id
          ))
      );
    },

    handleDeleteJokeOnePart(id: number) {
      this.deleteOnePartJoke(id);
    },
    handleDeleteJokeTwoPart(id: number) {
      this.deleteTwoPartJoke(id);
      this.toastThatJokeWasDeleted();
    },
  },

  mounted() {
    this.getTwoPartTypeJokesOnLoad();
    this.getOnePartTypeJokesOnLoad();
  },
};
</script>

<template>
  <div class="allJokesContainer">
    <div class="allJokesContainer-half">
      <h3>FAVORITE ONE PART JOKES</h3>
      <div class="jokes-container">
        <div v-for="itemOnePart in listItemsOnePart" class="single-part-joke">
          <button
            @click="handleDeleteJokeOnePart(itemOnePart.id)"
            class="single-part-joke__delete-button delete"
          >
            ???
          </button>
          <p class="single-part-joke__text">{{ itemOnePart.joke }}</p>
        </div>
      </div>
    </div>

    <div class="allJokesContainer-half">
      <h3>FAVORITE TWO PART JOKES</h3>
      <div>
        <div class="jokes-container jokes-container__two-part">
          <div v-for="itemTwoPart in listItemsTwoPart" class="two-part-joke">
            <button
              @click="handleDeleteJokeTwoPart(itemTwoPart.id)"
              class="two-part-joke__delete-button delete"
            >
              ???
            </button>
            <p class="two-part-joke__wrapper--setup">{{ itemTwoPart.setup }}</p>
            <br />
            <p class="two-part-joke__wrapper--delivery">
              {{ itemTwoPart.delivery }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.jokes-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 10px;
}
.allJokesContainer {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
}
.allJokesContainer-half {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.delete {
  background-color: transparent;
  border: none;
  cursor: pointer;
}
.delete:hover {
  background-color: aliceblue;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
