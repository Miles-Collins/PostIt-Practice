import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class AlbumsService {
  async getAll() {
    const albums = await dbContext.Albums.find().populate('memberCount creator', '-email')
    return albums
  }
  async getOne(albumId) {
    const album = await dbContext.Albums.findById(albumId).populate('memberCount creator', '-email')
    if(!album) {
      throw new BadRequest(`No album at Id: ${albumId}`)
    }
    return album
  }
  async create(albumData) {
    const album = await dbContext.Albums.create(albumData)
    await album.populate('memberCount creator', '-email')
    return album
  }
  async edit(albumData, userInfo) {
    const album = await this.getOne(albumData.id)
    if(album.creatorId != userInfo) {
      throw new Forbidden(`You do not have permission to edit Album: ${album.title}`)
    }
    album.title = albumData.title || album.title
    album.category = albumData.category || album.category
    album.archived = albumData.archived || album.archived
    album.coverImg = albumData.coverImg || album.coverImg

    await  album.save()

    return album
  }
  async delete(albumId, userInfo) {
    const album = await this.getOne(albumId)

    if(album.creatorId != userInfo.Id) {
      throw new Forbidden(`You do not have permission to delete Album: ${album.title}`)
    }

    album.archived = true
    await album.save()
    return album
  }

}

export const albumsService = new AlbumsService()
