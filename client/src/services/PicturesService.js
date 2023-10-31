import { AppState } from "../AppState.js";
import { Picture } from "../models/Picture.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class PicturesService {
  async getPictures(albumId) {
    const res = await api.get(`api/albums/${albumId}/pictures`);
    logger.log("[PICTURES SERVICE] getPictures => res.data:", res.data);
    AppState.pictures = res.data.map((picture) => new Picture(picture));
  }

  async createPicture(albumData) {
    const res = await api.post(`api/pictures`, albumData);
    logger.log("[PICTURES SERVICE] createPicture() => res.data:", res.data);
    AppState.pictures.push(new Picture(res.data));
  }

  async deletePicture(pictureId) {
    const res = await api.delete(`api/pictures/${pictureId}`);
    logger.log("[PICTURES SERVICE] deletePictures() => res.data", res.data);
    AppState.pictures = AppState.pictures.filter(
      (picture) => picture.id != pictureId
    );
  }
}

export const picturesService = new PicturesService();
