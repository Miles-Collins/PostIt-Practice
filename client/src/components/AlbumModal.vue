<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="albumModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Create Album</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createAlbum()">
            <div class="mb-3">
              <label for="title" class="form-label">Album Title</label>
              <input
                v-model="editable.title"
                required
                type="text"
                class="form-control"
                id="title
"
                aria-describedby="album title"
              />
              <div id="titleHelp" class="form-text">
                Please input an appropriate title for you Album.
              </div>
            </div>
            <div class="mb-3">
              <label for="coverImg" class="form-label">Cover Image</label>
              <input
                type="url"
                required
                class="form-control"
                id="coverImg"
                v-model="editable.coverImg"
              />
              <div id="coverImgHelp" class="form-text">
                Please input an appropriate cover image for you Album.
              </div>
            </div>
            <div class="mb-3">
              <label for="category" class="form-label">Category</label>
              <select
                v-model="editable.category"
                class="form-select mb-3"
                id="category"
              >
                <option value="misc">Misc.</option>
                <option value="cars">Cars</option>
                <option value="animals">Animals</option>
                <option value="pokemon">Pokemon</option>
                <option value="fish">Fish</option>
                <option value="food">Food</option>
                <option value="germs">Germs</option>
                <option value="coding">Coding</option>
                <option value="games">Games</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { albumsService } from "../services/AlbumsService.js";
import { Modal } from "bootstrap";

export default {
  setup() {
    const editable = ref({});
    return {
      editable,
      async createAlbum() {
        try {
          const albumData = editable.value;
          await albumsService.createAlbum(albumData);
          editable.value = { category: "misc" };
          Modal.getOrCreateInstance("#albumModal").hide();
        } catch (error) {
          logger.error("[ERROR]", error);
          Pop.error("[ERROR]", error.message);
        }
      },
    };
  },
};
</script>

<style></style>
