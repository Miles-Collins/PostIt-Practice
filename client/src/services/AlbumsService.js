import { AppState } from "../AppState.js";
import { Album } from "../models/Album.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class AlbumsService {
  async getAlbums() {
    const res = await api.get("api/albums");
    logger.log("[ALBUMS SERVICE] getAlbums => res.data:", res.data);
    AppState.albums = res.data.map((album) => new Album(album));
  }

  async getAlbum(albumId) {
    const res = await api.get(`api/albums/${albumId}`);
    logger.log("[ALBUMS SERVICE] getAlbum() => res.data:", res.data);
    AppState.activeAlbum = new Album(res.data);
  }

  async createAlbum(albumData) {
    const res = await api.post("api/albums", albumData);
    logger.log("[ALBUMS SERVICE] createAlbum => res.data:", res.data);
    AppState.albums.unshift(new Album(res.data));
    AppState.myAlbums.unshift(new Album(res.data));
  }

  // My Albums

  async getMyAlbums() {
    const res = await api.get("account/albums");
    logger.log("[ALBUMS SERVICE] getMyAlbums => res.data:", res.data);
    AppState.myAlbums = res.data.map((album) => new Album(album));
  }

  async deleteAlbum(albumId) {
    const res = await api.delete(`api/albums/${albumId}`);
    logger.log("[ALBUMS SERVICE] deleteAlbum() => res.data:", res.data);
    AppState.albums = AppState.albums.filter((album) => album.id != albumId);
    AppState.myAlbums = AppState.myAlbums.filter(
      (album) => album.id != albumId
    );
  }
}

export const albumsService = new AlbumsService();
