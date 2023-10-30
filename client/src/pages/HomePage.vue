<template>
  <div class="container">
    <div class="row mb-5">
      <p class="fs-1 text-white">My Albums</p>
      <div v-for="album in myAlbums" :key="album.id" class="col-4 col-lg-2">
        <AlbumCard :album="album" />
      </div>
    </div>
    <div class="row p-5">
      <div v-for="album in albums" :key="album.id" class="col-6 col-lg-3">
        <AlbumCard :album="album" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { albumsService } from "../services/AlbumsService.js";
import { AppState } from "../AppState.js";
import AlbumCard from "../components/AlbumCard.vue";

export default {
  setup() {
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
      albums: computed(() => AppState.albums),
      myAlbums: computed(() => AppState.myAlbums),
    };
  },
  components: { AlbumCard },
};
</script>

<style scoped lang="scss"></style>
