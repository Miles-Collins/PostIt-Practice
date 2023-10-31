<template>
  <i
    role="button"
    type="button"
    @click="deleteAlbum()"
    v-if="album.creatorId == account.id"
    class="text-danger fs-4 mdi mdi-close-box"
  ></i>
  <router-link :to="{ name: 'Album', params: { albumId: album.id } }">
    <div class="row album-box-shadow text-white">
      <div class="col-12 text-center">
        <img class="img-fluid" :src="album.coverImg" alt="" />
      </div>
      <div class="col-12 text-center bg-dark p-2 bottom-border-radius">
        <p class="fs-4">{{ album.title }}</p>
        <p>{{ album.memberCount }} <i class="text-danger mdi mdi-heart"></i></p>
      </div>
    </div>
  </router-link>
</template>

<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import { Album } from "../models/Album.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { albumsService } from "../services/AlbumsService.js";

export default {
  props: { album: { type: Album, required: true } },

  setup(props) {
    return {
      account: computed(() => AppState.account),

      async deleteAlbum() {
        try {
          const yes = await Pop.confirm(
            `Are you sure you want to delete the ${props.album.title} album?`
          );
          if (!yes) {
            return;
          }
          await albumsService.deleteAlbum(props.album.id);
        } catch (error) {
          logger.error("[ERROR]", error);
          Pop.error("[ERROR]", error.message);
        }
      },
    };
  },
};
</script>

<style scoped>
.album-image {
  height: 10rem;
  width: 10rem;
}

.album-box-shadow {
  box-shadow: 5px 5px white;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.356);
}

.album-box-shadow:hover {
  box-shadow: 5px 5px 15px white;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.911);
  cursor: pointer;
}

p {
  text-shadow: 3px 3px 3px black, 3px 3px 3px black, 3px 3px 3px black;
}

.bottom-border-radius {
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}
</style>
