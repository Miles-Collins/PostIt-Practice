import { dbContext } from "../db/DbContext.js";

class AlbumsService {
  async getAll() {
    const albums = await dbContext.
  }
  async getOne(albumId) {
    throw new Error("Method not implemented.");
  }
  async create(albumData) {
    throw new Error("Method not implemented.");
  }
  async edit(albumData, userInfo) {
    throw new Error("Method not implemented.");
  }
  async delete(albumId, userInfo) {
    throw new Error("Method not implemented.");
  }

}

export const albumsService = new AlbumsService()
