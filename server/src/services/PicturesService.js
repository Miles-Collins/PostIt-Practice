import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class PicturesService {
  async delete(pictureId, userId) {
    const picture = await this.getOne(pictureId)
    if(picture.creatorId != userId) {
      throw new Forbidden(`You do not have permission to delete this picture!`)
    }
    await picture.remove()
    return

  }
  async create(pictureData) {
    const picture = await dbContext.Pictures.create(pictureData)
    picture.populate('creator', '-email')
    return picture
  }
  async getPictures(albumId) {
    const pictures = await dbContext.Pictures.find({albumId}).populate('creator', '-email')
    return pictures
  }

  async getOne(pictureId) {
    const picture = await dbContext.Pictures.findById(pictureId).populate('creator', '-email')
    if(!picture) {
      throw new BadRequest(`No picture with Id: ${pictureId}`)
    }
    return picture
  }

}

export const picturesService = new PicturesService()
