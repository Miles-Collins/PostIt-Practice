import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class PicturesService {
  async getPictures(albumId) {
    const res = await api.get(`api/albums/${albumId}/pictures`);
    logger.log("[PICTURES SERVICE] getPictures => res.data:", res.data);
  }
}

export const picturesService = new PicturesService();
