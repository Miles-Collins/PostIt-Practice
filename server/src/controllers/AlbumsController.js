import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { logger } from "../utils/Logger.js";
import { albumsService } from "../services/AlbumsService.js";
import { picturesService } from "../services/PicturesService.js";
import { collaboratorsService } from "../services/CollaboratorsService.js";

export class AlbumsController extends BaseController {
  constructor() {
    super('api/albums')
    this.router
    .get('', this.getAll)
    .get('/:albumId', this.getOne)
    .get('/:albumId/pictures', this.getPictures)
    .get('/:albumId/collaborators', this.getCollaborators)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.create)
    .put('/:albumId', this.edit)
    .delete('/:albumId', this.delete)
  }

  async getAll(req, res, next) {
    try {
      const albums = await albumsService.getAll()
      return res.send(albums)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const albumId = req.params.albumId
      const album = await albumsService.getOne(albumId)
      return res.send(album)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
    const albumData = req.body
    albumData.creatorId = req.userInfo.id
    const newAlbum = await albumsService.create(albumData)
      return res.send(newAlbum)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      const albumData = req.body
      albumData.id = req.params.albumId
      const userInfo = req.userInfo.id
      const album = await albumsService.edit(albumData, userInfo)
      return res.send(album)
    } catch (error) {
      next(error)
    }
  }

  async delete (req, res, next) {
  try {
    const albumId = req.params.albumId
    const userInfo = req.userInfo.id
    const album = await albumsService.delete(albumId, userInfo)
    return res.send(album)
  } catch (error) {
    next(error)
  }
  }

  // Pictures

  async getPictures (req, res, next) {
  try {
    const albumId = req.params.albumId
    const pictures = await picturesService.getPictures(albumId)
    return res.send(pictures)
  } catch (error) {
    next(error)
  }
  }

  // Collaborators

  async getCollaborators (req, res, next) {
  try {
    const albumId = req.params.albumId
    const collaborators = await collaboratorsService.getCollaborators(albumId)
    return res.send(collaborators)
  } catch (error) {
    next(error)
  }
  }



}
