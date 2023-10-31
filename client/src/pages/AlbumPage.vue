<template>
  <div v-if="album && collaborators && pictures" class="container-fluid">
    <div class="row">
      <div class="col-12 col-lg-3">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-6">
            <img class="img-fluid" :src="album.coverImg" alt="" />
          </div>
          <div class="col-12 col-lg-6 text-white">
            <div class="p-2 p-lg-3 bg-success rounded box-shadow">
              <p class="text-white text-shadow">{{ album.title }}</p>
              <p class="text-black">by {{ album.creator.name }}</p>
            </div>
            <div class="mt-3">
              <button
                data-bs-toggle="modal"
                data-bs-target="#pictureModal"
                class="btn btn-success box-shadow"
              >
                <i class="mdi mdi-plus-box"></i> add Picture
              </button>
            </div>
          </div>
          <div class="col-12 text-shadow mt-3">
            <div class="row">
              <div
                class="col-12 col-lg-5 offset-lg-2 text-white bg-primary rounded p-2 p-lg-3 mb-2 mb-lg-0"
              >
                <div class="p-2 p-lg-0">
                  {{ album.memberCount }}
                  <p>Collaborators</p>
                </div>
              </div>
              <div
                @click="becomeCollaborator()"
                role="button"
                class="col-12 col-lg-3 bg-success text-white rounded text-center p-1 p-lg-3"
              >
                <i class="text-danger mdi mdi-heart"></i>
                <p>Collab</p>
              </div>
            </div>
          </div>
          <div
            v-for="collaborator in collaborators"
            :key="collaborator.id"
            class="col-4 mt-4"
          >
            <img
              class="img-fluid rounded-circle box-shadow"
              :src="collaborator.profile.picture"
              alt=""
              :title="collaborator.profile.name"
            />
          </div>
        </div>
      </div>
      <div class="col-9">
        <div class="row">
          <div v-for="picture in pictures" :key="picture.id" class="col-3">
            <img
              class="img-fluid box-shadow"
              :src="picture.imgUrl"
              alt=""
              :title="picture.creator?.name"
            />
            <i
              v-if="picture.creatorId == account.id"
              @click="deletePicture(picture.id)"
              role="button"
              type="button"
              class="text-danger fs-3 mdi mdi-close-box"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { picturesService } from "../services/PicturesService.js";
import { collaboratorsService } from "../services/CollaboratorsService.js";
import { computed, onMounted } from "vue";
import { albumsService } from "../services/AlbumsService.js";
import { AppState } from "../AppState.js";

export default {
  setup() {
    const route = useRoute();
    onMounted(() => {
      getAlbum();
      getPictures();
      getCollaborators();
    });

    async function getAlbum() {
      try {
        const albumId = route.params.albumId;
        await albumsService.getAlbum(albumId);
      } catch (error) {
        logger.error("[ERROR]", error);
        Pop.error("[ERROR]", error.message);
      }
    }
    async function getPictures() {
      try {
        const albumId = route.params.albumId;
        await picturesService.getPictures(albumId);
      } catch (error) {
        logger.error("[ERROR]", error);
        Pop.error("[ERROR]", error.message);
      }
    }

    async function getCollaborators() {
      try {
        const albumId = route.params.albumId;
        await collaboratorsService.getCollaborators(albumId);
      } catch (error) {
        logger.error("[ERROR]", error);
        Pop.error("[ERROR]", error.message);
      }
    }
    return {
      album: computed(() => AppState.activeAlbum),
      collaborators: computed(() => AppState.collaborators),
      pictures: computed(() => AppState.pictures),
      account: computed(() => AppState.account),

      async becomeCollaborator() {
        try {
          const albumId = route.params.albumId;
          await collaboratorsService.becomeCollaborator(albumId);
        } catch (error) {
          logger.error("[ERROR]", error);
          Pop.error("[ERROR]", error.message);
        }
      },

      async deletePicture(pictureId) {
        try {
          const yes = await Pop.confirm(
            "Are you sure you want to delete this picture?"
          );
          if (!yes) {
            return;
          }
          await picturesService.deletePicture(pictureId);
          Pop.success("Successfully deleted Picture.");
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
p {
  margin: 0;
}

.text-shadow {
  text-shadow: 2px 2px 2px black;
}

.box-shadow {
  box-shadow: 3px 3px white;
  border: 1px solid rgba(255, 255, 255, 0.313);
}
.box-shadow:hover {
  box-shadow: 3px 3px 5px white;
  border: 1px solid rgba(255, 255, 255, 0.909);
  cursor: pointer;
}
</style>
