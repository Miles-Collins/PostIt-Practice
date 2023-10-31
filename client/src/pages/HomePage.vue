<template>
  <div class="container">
    <div class="row mb-5">
      <p class="fs-1 text-white">My Albums</p>
      <div
        v-for="album in myAlbums"
        :key="album.id"
        class="col-4 mx-4 col-lg-2"
      >
        <AlbumCard :album="album" />
      </div>
    </div>
    <div class="row my-4 justify-content-center">
      <div class="col-12 col-lg-10">
        <div class="d-flex justify-content-around bg-primary rounded-pill p-3">
          <button
            class="btn btn-outline-light w-lg-100 mx-lg-4"
            @click="changeFilterCategory('')"
          >
            All
          </button>
          <button
            class="btn btn-outline-light w-lg-100 mx-lg-4"
            @click="changeFilterCategory('animals')"
          >
            Animals
          </button>
          <button
            class="btn btn-outline-light w-lg-100 mx-lg-4"
            @click="changeFilterCategory('pokemon')"
          >
            Pokemon
          </button>
          <button
            class="btn btn-outline-light w-lg-100 mx-lg-4"
            @click="changeFilterCategory('germs')"
          >
            Germs
          </button>
        </div>
      </div>
    </div>
    <div class="row justify-content-around p-5">
      <div v-for="album in albums" :key="album.id" class="col-6 col-lg-3 mx-1">
        <AlbumCard :album="album" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { albumsService } from "../services/AlbumsService.js";
import { AppState } from "../AppState.js";
import AlbumCard from "../components/AlbumCard.vue";

export default {
  setup() {
    const filterCategory = ref("");

    onMounted(() => {
      getAlbums();
    });
    async function getAlbums() {
      try {
        await albumsService.getAlbums();
      } catch (error) {
        logger.error("[ERROR]", error);
        Pop.error("[ERROR]", error.message);
      }
    }
    return {
      filterCategory,
      albums: computed(() => {
        if (!filterCategory.value) {
          return AppState.albums;
        } else {
          return AppState.albums.filter(
            (album) => album.category == filterCategory.value
          );
        }
      }),
      myAlbums: computed(() => AppState.myAlbums),

      changeFilterCategory(category) {
        filterCategory.value = category;
      },
    };
  },
  components: { AlbumCard },
};
</script>

<style scoped lang="scss"></style>
