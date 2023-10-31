import { Auth0Provider } from "@bcwdev/auth0provider";
import { picturesService } from "../services/PicturesService.js";
import BaseController from "../utils/BaseController.js";

export class PicturesController extends BaseController{
  constructor() {
    super('api/pictures')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.create)
    .delete('/:pictureId', this.delete)
  }

  async create (req, res, next) {
  try {
    const pictureData = req.body
    pictureData.creatorId = req.userInfo.id
    const picture = await picturesService.create(pictureData)
    return res.send(picture)
  } catch (error) {
    next(error)
  }
  }

  async delete (req, res, next) {
  try {
    const pictureId = req.params.pictureId
    const userId = req.userInfo.id
    const message = await picturesService.delete(pictureId, userId)
    return res.send(message)
  } catch (error) {
    next(error)
  }
  }


}
