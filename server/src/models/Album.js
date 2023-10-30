import { Schema } from "mongoose";

export const AlbumSchema = new Schema({
  title: {type: String, required: true, min: 1, max: 20 },
  category: {type: String, required: true},
  archived: {type: Boolean, default: false},
  coverImg: {type: String, required: true, max: 500},
  creatorId: {type: Schema.Types.ObjectId, required: true, ref: "Account"},
}, { timestamps: true, toJSON: { virtuals: true }})

AlbumSchema.virtual("memberCount", {
  localField: '_id',
  foreignField: 'albumId',
  ref: "Collaborator",
  count: true
})

AlbumSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
