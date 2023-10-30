<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <AlbumModal />
</template>

<script>
import { computed } from "vue";
import { AppState } from "./AppState";
import Navbar from "./components/Navbar.vue";
import AlbumModal from "./components/AlbumModal.vue";

export default {
  setup() {
    return {
      appState: computed(() => AppState),
    };
  },
  components: { Navbar, AlbumModal },
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}

body {
  background-image: url(./assets/img/home-page-bg.png);
  background-position: center;
  background-size: cover;
  max-height: 100dvh;
}
</style>
