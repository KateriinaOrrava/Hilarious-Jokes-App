<script lang="ts">
import { stringifyExpression } from '@vue/compiler-core';
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
    };
  },
  methods: {
    async getData() {
      const res = await fetch(
        'https://v2.jokeapi.dev/joke/Any?type=single&amount=10/jokess'
      );
      const finalRes = await res.json();
      this.listItems = finalRes.jokes;
      console.log(finalRes.jokes);
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
<template>
  <div class="jokes-container">
    <div v-for="item in listItems" class="single-joke">
      {{ item.joke }}
      {{ item.category }}
      <br />
    </div>
  </div>
</template>

<style>
.jokes-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  flex-wrap: wrap;
  gap: 5px;
}
.single-joke {
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
