<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="pictureModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Create Picture
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createPicture()">
            <div class="mb-3">
              <label for="imgUrl" class="form-label">Image</label>
              <input
                type="url"
                required
                class="form-control"
                id="imgUrl"
                v-model="editable.imgUrl"
              />
              <div id="imgUrlHelp" class="form-text">
                Please input an appropriate Image for you Picture.
              </div>
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
import { useRoute } from "vue-router";
import { picturesService } from "../services/PicturesService.js";

export default {
  setup() {
    const editable = ref({});
    const route = useRoute();
    return {
      editable,
      async createPicture() {
        try {
          const pictureData = editable.value;
          pictureData.albumId = route.params.albumId;
          await picturesService.createPicture(pictureData);
          editable.value = {};
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
