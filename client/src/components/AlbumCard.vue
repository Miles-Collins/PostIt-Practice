<template>
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
import { Album } from "../models/Album.js";

export default {
  props: { album: { type: Album, required: true } },

  setup() {
    return {};
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
