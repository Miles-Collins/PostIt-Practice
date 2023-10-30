import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { AlbumSchema } from '../models/Album.js';
import { CollaboratorSchema } from '../models/Collaborator.js';
import { PictureSchema } from '../models/Picture.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Albums = mongoose.model('Album', AlbumSchema);
  Collaborators = mongoose.model('Collaborator', CollaboratorSchema);
  Pictures = mongoose.model('Picture', PictureSchema);
}

export const dbContext = new DbContext()
