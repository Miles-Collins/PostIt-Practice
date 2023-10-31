import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { collaboratorsService } from "../services/CollaboratorsService.js";

export class CollaboratorsController extends BaseController{
  constructor() {
    super('api/collaborator')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.create)
    .delete('/:collaboratorId', this.delete)
  }

  async create (req, res, next) {
  try {
    const collaboratorBody = req.body
    collaboratorBody.accountId = req.userInfo.id
    const collaborator = await collaboratorsService.create(collaboratorBody)
    return res.send(collaborator)
  } catch (error) {
    next(error)
  }
  }

  async delete (req, res, next) {
  try {
    const collaboratorId = req.params.collaboratorId
    const userId = req.userInfo.id
    const message = await collaboratorsService.delete(collaboratorId, userId)
    return res.send(message)
  } catch (error) {
    next(error)
  }
  }


}
