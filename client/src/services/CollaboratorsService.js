import { AppState } from "../AppState.js";
import { Collaborator } from "../models/Collaborator.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class CollaboratorsService {
  async getCollaborators(albumId) {
    const res = await api.get(`api/albums/${albumId}/collaborators`);
    logger.log(
      "[COLLABORATORS SERVICE] getCollaborators() => res.data:",
      res.data
    );
    AppState.collaborators = res.data.map(
      (collaborator) => new Collaborator(collaborator)
    );
  }

  async becomeCollaborator(albumId) {
    const albumData = { albumId: albumId };
    const res = await api.post("api/collaborator", albumData);
    logger.log(
      "[COLLABORATORS SERVICE] becomeCollaborator() => res.data:",
      res.data
    );
    AppState.collaborators = new Collaborator(res.data);
  }
}

export const collaboratorsService = new CollaboratorsService();
