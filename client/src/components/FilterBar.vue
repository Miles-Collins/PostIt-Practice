<template>
  <div class="row my-4">
    <div class="col-10">
      <div>
        <button @click="changeFilterCategory('')">All</button>
        <button @click="changeFilterCategory('animals')">Animals</button>
        <button @click="changeFilterCategory('pokemon')">Pokemon</button>
        <button @click="changeFilterCategory('germs')">Germs</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const filterCategory = ref("");
    return {
      filterCategory,

      changeFilterCategory(category) {
        filterCategory.value = category;
      },
    };
  },
};
</script>

<style></style>
