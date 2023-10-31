import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CollaboratorsService {
  async delete(collaboratorId, userId) {
    const collaborator = await this.getOne(collaboratorId)
    if(collaborator.accountId != userId) {
      throw new Forbidden(`You do not have permission to delete this collaborator`)
    }
    await collaborator.remove()
    return `Successfully removed Collaborator.`
  }
  async create(collaboratorBody) {
    const collaborator = await dbContext.Collaborators.create(collaboratorBody)
    await collaborator.populate('album profile', '-email')
    return collaborator
  }
  async getCollaborators(albumId) {
    const collaborators = await dbContext.Collaborators.find({albumId}).populate('album profile', '-email')
    return collaborators
  }

  async getOne(collaboratorId) {
    const collaborator = await dbContext.Collaborators.findById(collaboratorId).populate('album profile', '-email')
    if(!collaborator) {
      throw new BadRequest('No Collaborator at Id: ${collaboratorId}')
    }
    return collaborator
  }

}

export const collaboratorsService = new CollaboratorsService()
