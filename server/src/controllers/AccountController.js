import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { albumsService } from '../services/AlbumsService.js'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/albums', this.myAlbums )
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }
    async myAlbums (req, res, next) {
    try {
      const creatorId = req.userInfo.id
      const albums = await albumsService.getMyAlbums(creatorId)
      return res.send(albums)
    } catch (error) {
      next(error)
    }
    }

}
